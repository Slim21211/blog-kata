import React from 'react';

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

  return (
    <div className={headerWrapper}>
      <div className={headerTitle}>Realworld Blog</div>
      <div>
        <button className={signInButton}>Sign In</button>
        <button className={signUpButton}>Sign Up</button>
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
