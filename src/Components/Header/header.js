import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';

import noAvatar from '../../Assets//Noavatar.png';
import { getUser, logOutUser } from '../../Redux/Actions/fetch-get-user-action';
import { startRegistration } from '../../Redux/Actions/fetch-registration-action';
import { fetchArticles } from '../../Redux/Actions/fetch-articles-action';
import { logOutSession } from '../../Redux/Actions/fetch-login-action';

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
  const isLoged = localStorage.getItem('token');
  const user = useSelector((state) => state.getUserReducer.user);
  const loginToken = useSelector((state) => state.loginReducer.loginToken);
  const actualToken = localStorage.getItem('token') ? localStorage.getItem('token') : loginToken;

  useEffect(() => {
    if (actualToken) {
      dispatch(getUser(actualToken));
    }
  }, [dispatch, loginToken]);

  const onSignUp = async () => {
    dispatch(startRegistration());
    history.push('/sign-up');
  };

  const onSignIn = () => {
    history.push('/sign-in');
  };

  const onEditProfile = () => {
    history.push('/profile');
  };

  const logOut = () => {
    localStorage.clear();
    dispatch(logOutSession());
    dispatch(logOutUser());
    dispatch(fetchArticles(0));
  };

  const onCreate = () => {
    history.push('/new-article');
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
        <button className={isLoged ? createButtonLog : createButton} onClick={onCreate}>
          Create article
        </button>
        <div className={userWrapper} onClick={onEditProfile}>
          <div className={isLoged ? userNameLog : userName}>{user.user ? user.user.username : null}</div>
          <img
            src={!user.user || !user.user.image ? noAvatar : user.user.image}
            className={isLoged ? userImageLog : userImage}
            alt="avatar"
          ></img>
        </div>
        <button className={isLoged ? logOutButtonLog : logOutButton} onClick={logOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
