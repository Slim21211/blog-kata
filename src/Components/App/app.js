import React from 'react';

import Header from '../Header/header';

import styles from './app.module.scss';

export const App = () => {
  const { 'main-wrapper': mainWrapper } = styles;
  return (
    <div className={mainWrapper}>
      <Header />
    </div>
  );
};
