import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../Redux/Actions/fetch-get-user-action';
import noAvatar from '../../Assets//Noavatar.png';

import styles from './header.module.scss';

const Header = () => {
  const {
    'header-wrapper': headerWrapper,
    'header-title': headerTitle,
    'login-wrapper': loginWrapper,
    'signIn-button': signInButton,
    'signIn-button-log': signInButtonLog,
    'signUp-button': signUpButton,
    'signUp-button-log': signUpButtonLog,
    'create-button': createButton,
    'create-button-log': createButtonLog,
    'user-wrapper': userWrapper,
    'user-name': userName,
    'user-name-log': userNameLog,
    'user-image': userImage,
    'user-image-log': userImageLog,
    'logout-button': logOutButton,
    'logout-button-log': logOutButtonLog,
  } = styles;

  const history = useHistory();
  const dispatch = useDispatch();
  const isLoged = useSelector((state) => state.loginReducer.isLoged);
  const token = useSelector((state) => state.loginReducer.token);
  const user = useSelector((state) => state.getUserReducer.user);

  useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);

  const onSignUp = () => {
    history.push('/registration');
  };

  const onSignIn = () => {
    history.push('/login');
  };

  const onEditProfile = () => {
    history.push('/edit');
  };

  return (
    <div className={headerWrapper}>
      <Link to="/page/1" className={headerTitle}>
        Realworld Blog
      </Link>
      <div className={loginWrapper}>
        <button className={isLoged ? signInButtonLog : signInButton} onClick={onSignIn}>
          Sign In
        </button>
        <button className={isLoged ? signUpButtonLog : signUpButton} onClick={onSignUp}>
          Sign Up
        </button>
        <button className={isLoged ? createButtonLog : createButton}>Create article</button>
        <div className={userWrapper} onClick={onEditProfile}>
          <div className={isLoged ? userNameLog : userName}>{user.user ? user.user.username : null}</div>
          <img
            src={!user.user || !user.user.image ? noAvatar : user.user.image}
            className={isLoged ? userImageLog : userImage}
            alt="avatar"
          ></img>
        </div>
        <button className={isLoged ? logOutButtonLog : logOutButton}>Log Out</button>
      </div>
    </div>
  );
};

export default Header;
