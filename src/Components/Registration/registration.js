import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { registrationUser } from '../../Redux/Actions/fetch-registration-action';

import styles from './registration.module.scss';

const Registration = () => {
  const {
    wrapper,
    form,
    title,
    label,
    input,
    'input-wrong': inputWrong,
    'input-descr': inputDescr,
    line,
    check,
    'check-input': checkInput,
    'check-box': checkBox,
    name,
    button,
    'question-wrapper': questionWrapper,
    question,
    link,
  } = styles;

  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.registrationReducer.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    await dispatch(registrationUser(data));
  };

  useEffect(() => {
    if (error?.username && error?.email) {
      setError('username', { type: 'manual', message: 'This username is already taken or invalid' });
      setError('email', { type: 'manual', message: 'This email is alredy taken' });
    } else if (error?.username) {
      setError('username', { type: 'manual', message: 'This username is already taken' });
    } else if (error?.email) {
      setError('email', { type: 'manual', message: 'This email is alredy taken' });
    } else if (error === 'no error') {
      history.push('/sign-in');
    }
  }, [error, history]);

  return (
    <div className={wrapper}>
      <div className={title}>Create new account</div>
      <form className={form} onSubmit={handleSubmit(onSubmit)}>
        <label className={label}>
          <div>Username</div>
          <input
            className={errors.username ? inputWrong : input}
            type="text"
            name="username"
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
              maxLength: { value: 20, message: 'Username can not exceed 20 characters' },
            })}
          ></input>
        </label>
        {errors.username && <div className={inputDescr}>{errors.username.message}</div>}
        {/* {usernameError && <div className={inputDescr}>{errors.username.message}</div>} */}
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
        {/* {emailError && <div className={inputDescr}>{errors.email.message}</div>} */}
        <label className={label}>
          <div>Password</div>
          <input
            className={errors.password ? inputWrong : input}
            type="password"
            name="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              maxLength: { value: 40, message: 'Username can not exceed 40 characters' },
            })}
          ></input>
        </label>
        {errors.password && <div className={inputDescr}>{errors.password.message}</div>}
        <label className={label}>
          <div>Repeat password</div>
          <input
            className={errors.repeatPassword ? inputWrong : input}
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            {...register('repeatPassword', {
              required: 'Repeat Password is required',
              validate: (value) => {
                const password = watch('password');
                return value === password || 'Passwords must match';
              },
            })}
          ></input>
        </label>
        {errors.repeatPassword && <div className={inputDescr}>{errors.repeatPassword.message}</div>}
        <div className={line}></div>
        <label className={check}>
          <input
            className={checkInput}
            type="checkbox"
            name="agree"
            {...register('agree', { required: 'You must agree to continue' })}
          />
          <span className={checkBox}></span>
          <span className={name}>I agree to the processing of my personal information</span>
        </label>
        {errors.agree && <div className={inputDescr}>{errors.agree.message}</div>}

        <button className={button} type="submit">
          Create
        </button>
      </form>
      <div className={questionWrapper}>
        <span className={question}>Already have an account? </span>
        <Link to="/sign-in">
          <span className={link}>Sign In.</span>
        </Link>
      </div>
    </div>
  );
};

export default Registration;
