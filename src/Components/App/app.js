import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { fetchArticles, fetchArticlesAuth } from '../../Redux/Actions/fetch-articles-action';
import Header from '../Header/header';
import PostsList from '../Posts-list/posts-list';
import Article from '../Article/article';
import Registration from '../Registration/registration';
import Login from '../Login/login';
import EditProfile from '../Edit-profile/edit-profile';
import CreateArticle from '../Create-article/create-article';
import EditArticle from '../Edit-article/edit-article';

import styles from './app.module.scss';

export const App = () => {
  const { 'main-wrapper': mainWrapper } = styles;

  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  useEffect(() => {
    if (token === null) {
      console.log(1);
      dispatch(fetchArticles(0));
    } else {
      console.log(2);
      dispatch(fetchArticlesAuth(0, token));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className={mainWrapper}>
        <Header />
        <Route path="/sign-up" component={Registration} />
        <Route path="/sign-in" component={Login} />
        <Route path="/profile" component={EditProfile} />
        <Route path="/page/:pageNumber" component={PostsList} />
        <Route path="/article/:slug" component={Article} />
        <Route path="/new-article" component={CreateArticle} />
        <Route path="/articles/:slug/edit" component={EditArticle} />
      </div>
    </Router>
  );
};
