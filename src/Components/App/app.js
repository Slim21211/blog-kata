import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { fetchArticles } from '../../Redux/Actions/fetch-articles-action';
import Header from '../Header/header';
import PostsList from '../Posts-list/posts-list';
import Article from '../Article/article';
import Registration from '../Registration/registration';

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
        <Redirect from="/" to="/page/1" />
        <Route path="/registration" component={Registration} />
        <Route path="/page/:pageNumber" component={PostsList} />
        <Route path="/article/:slug" component={Article} />
      </div>
    </Router>
  );
};
