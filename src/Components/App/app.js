import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { fetchArticles } from '../../Redux/Actions/fetch-articles-action';
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(0));
  }, [dispatch]);

  return (
    <Router>
      <div className={mainWrapper}>
        <Header />
        <Redirect from="/" to="/page/1" />
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/edit" component={EditProfile} />
        <Route path="/page/:pageNumber" component={PostsList} />
        <Route path="/article/:slug" component={Article} />
        <Route path="/new-article" component={CreateArticle} />
        <Route path="/articles/:slug/edit" component={EditArticle} />
      </div>
    </Router>
  );
};
