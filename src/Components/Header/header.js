import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import styles from './header.module.scss';

const Header = () => {
  const {
    'header-wrapper': headerWrapper,
    'header-title': headerTitle,
    'signIn-button': signInButton,
    'signUp-button': signUpButton,
    'create-button': createButton,
    'user-wrapper': userWrapper,
    'user-name': userName,
    'user-image': userImage,
    'logout-button': logOutButton,
  } = styles;

  const history = useHistory();

  const onClick = () => {
    history.push('/registration');
  };

  return (
    <div className={headerWrapper}>
      <Link to="/page/1" className={headerTitle}>
        Realworld Blog
      </Link>
      <div>
        <button className={signInButton}>Sign In</button>
        <button className={signUpButton} onClick={onClick}>
          Sign Up
        </button>
        <button className={createButton}>Create article</button>
        <div className={userWrapper}>
          <div className={userName}>John Doe</div>
          <img src="#" className={userImage} alt="avatar"></img>
        </div>
        <button className={logOutButton}>Log Out</button>
      </div>
    </div>
  );
};

export default Header;
