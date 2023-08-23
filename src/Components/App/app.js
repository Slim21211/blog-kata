import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchArticles } from '../../Redux/Actions/fetch-articles-action';
import Header from '../Header/header';
import PostsList from '../Posts-list/posts-list';

import styles from './app.module.scss';

export const App = () => {
  const { 'main-wrapper': mainWrapper } = styles;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <div className={mainWrapper}>
      <Header />
      <PostsList />
    </div>
  );
};
