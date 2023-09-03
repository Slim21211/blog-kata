import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useForm } from 'react-hook-form';

import { loginUser } from '../../Redux/Actions/fetch-login-action';

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
    button,
    'question-wrapper': questionWrapper,
    question,
    link,
  } = styles;

  const user = useSelector((state) => state.loginReducer.user);
  const token = useSelector((state) => state.loginReducer.token);

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
    history.push('/page/1');
    console.log(user);
    console.log(token);
  };

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
    </div>
  );
};

export default Login;
