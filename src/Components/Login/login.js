import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { loginUser } from '../../Redux/Actions/fetch-login-action';
import { SpinerSmall } from '../Spiner/spiner';
import { fetchArticlesAuth } from '../../Redux/Actions/fetch-articles-action';
import { getUser } from '../../Redux/Actions/fetch-get-user-action';

import styles from './login.module.scss';

const Login = () => {
  const {
    wrapper,
    form,
    title,
    label,
    input,
    'input-wrong': inputWrong,
    'input-descr': inputDescr,
    'input-descr-error': inputDescrError,
    button,
    'question-wrapper': questionWrapper,
    question,
    link,
  } = styles;

  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.loginReducer.error);
  const isLoading = useSelector((state) => state.loginReducer.isLoading);
  const loginToken = useSelector((state) => state.loginReducer.loginToken);
  const actualToken = localStorage.getItem('token') ? localStorage.getItem('token') : loginToken;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    await dispatch(loginUser(data));
  };

  useEffect(() => {
    if (error?.['email or password']) {
      setError('password', { type: 'manual', message: 'Email or password is invalid' });
    } else if (error === 'no error') {
      (async () => {
        console.log(1);
        await dispatch(getUser(loginToken));
        console.log(2);
        await dispatch(fetchArticlesAuth(0, actualToken));
        history.push('/page/1');
      })();
    }
  }, [error, history, loginToken, actualToken]);

  return (
    <div className={wrapper}>
      <div className={title}>Sign In</div>
      <form className={form} onSubmit={handleSubmit(onSubmit)}>
        <label className={label}>
          <div>Email address</div>
          <input
            className={errors.email ? inputWrong : input}
            type="mail"
            name="email"
            placeholder="Email address"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
            })}
          ></input>
        </label>
        {errors.email && <div className={inputDescr}>{errors.email.message}</div>}
        <label className={label}>
          <div>Password</div>
          <input
            className={input}
            type="password"
            name="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
            })}
          ></input>
        </label>
        {errors.password && <div className={inputDescr}>{errors.password.message}</div>}
        {isLoading && <SpinerSmall />}
        <button className={button} type="submit">
          Login
        </button>
      </form>
      <div className={questionWrapper}>
        <span className={question}>Don’t have an account? </span>
        <Link to="/registration">
          <span className={link}>Sign Up.</span>
        </Link>
      </div>
      {error && !error['email or password'] && (
        <div className={inputDescrError}>Something has gone wrong. Try again later</div>
      )}
    </div>
  );
};

export default Login;
