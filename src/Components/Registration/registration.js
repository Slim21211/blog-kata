import React from 'react';
import { Link } from 'react-router-dom';

import styles from './registration.module.scss';

const Registration = () => {
  const {
    wrapper,
    form,
    title,
    label,
    input,
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
  return (
    <div className={wrapper}>
      <div className={title}>Create new account</div>
      <form className={form}>
        <label className={label}>
          <div>Username</div>
          <input className={input} type="text" name="Username" placeholder="Username"></input>
        </label>
        <label className={label}>
          <div>Email address</div>
          <input className={input} type="mail" name="Email address" placeholder="Email address"></input>
        </label>
        <label className={label}>
          <div>Password</div>
          <input className={input} type="password" name="Password" placeholder="Password"></input>
        </label>
        <label className={label}>
          <div>Repeat password</div>
          <input className={input} type="password" name="Repeat Password" placeholder="Repeat Password"></input>
        </label>
        <div className={line}></div>
        <label className={check}>
          <input className={checkInput} type="checkbox" />
          <span className={checkBox}></span>
          <span className={name}>I agree to the processing of my personal information</span>
        </label>
        <button className={button} type="submit">
          Create
        </button>
      </form>
      <div className={questionWrapper}>
        <span className={question}>Already have an account? </span>
        <Link to="/page/1">
          <span className={link}>Sign In.</span>
        </Link>
      </div>
    </div>
  );
};

export default Registration;
