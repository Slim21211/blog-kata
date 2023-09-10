import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { editUser } from '../../Redux/Actions/fetch-edit-user-action';

import styles from './edit-profile.module.scss';

const EditProfile = () => {
  const { wrapper, form, title, label, input, 'input-wrong': inputWrong, 'input-descr': inputDescr, button } = styles;

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.getUserReducer.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: user.user?.username || '',
      email: user.user?.email || '',
      image: user.user?.image || '',
    },
  });

  const onSubmit = (data) => {
    const token = localStorage.getItem('token');
    dispatch(editUser(data, token));
    history.push('/page/1');
  };

  return (
    <div className={wrapper}>
      <div className={title}>Edit Profile</div>
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
          <div>New password</div>
          <input
            className={errors.password ? inputWrong : input}
            type="password"
            name="password"
            placeholder="New password"
            {...register('password', {
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              maxLength: { value: 40, message: 'Username can not exceed 40 characters' },
            })}
          ></input>
        </label>
        {errors.password && <div className={inputDescr}>{errors.password.message}</div>}
        <label className={label}>
          <div>Avatar image (url)</div>
          <input
            className={errors.avatar ? inputWrong : input}
            type="url"
            name="image"
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: 'Invalid URL',
              },
            })}
          ></input>
        </label>
        {errors.avatar && <div className={inputDescr}>{errors.avatar.message}</div>}
        <button className={button} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
