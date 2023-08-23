import React from 'react';

import Header from '../Header/header';
import PostsList from '../Posts-list/posts-list';

import styles from './app.module.scss';

export const App = () => {
  const { 'main-wrapper': mainWrapper } = styles;
  return (
    <div className={mainWrapper}>
      <Header />
      <PostsList />
    </div>
  );
};
