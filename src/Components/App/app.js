import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { fetchArticles } from '../../Redux/Actions/fetch-articles-action';
import Header from '../Header/header';
import PostsList from '../Posts-list/posts-list';

import styles from './app.module.scss';

export const App = () => {
  const { 'main-wrapper': mainWrapper } = styles;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(0));
  }, []);

  return (
    <Router>
      <div className={mainWrapper}>
        <Header />
        <Route exact path="/her" component={PostsList} />
      </div>
    </Router>
  );
};
