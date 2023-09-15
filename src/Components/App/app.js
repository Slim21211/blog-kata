import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { fetchArticles, fetchArticlesAuth } from '../../Redux/Actions/fetch-articles-action';
import Header from '../Header/header';
import PostsList from '../Posts-list/posts-list';
import Article from '../Article/article';
import Registration from '../Registration/registration';
import Login from '../Login/login';
import EditProfile from '../Edit-profile/edit-profile';
import CreateArticle from '../Create-article/create-article';
import EditArticle from '../Edit-article/edit-article';
import { SIGN_UP, SIGN_IN, PROFILE, ARTICLE, NEW_ARTICLE, EDIT_ARTICLE, PAGE, HOME } from '../../routePath';

import styles from './app.module.scss';

export const App = () => {
  const { 'main-wrapper': mainWrapper } = styles;

  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  useEffect(() => {
    const pageInUrl = window.location.pathname.match(/\/page\/(\d+)/);
    if (!pageInUrl) {
      if (token === null) {
        dispatch(fetchArticles(0));
      } else {
        dispatch(fetchArticlesAuth(0, token));
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <div className={mainWrapper}>
        <Header />
        <Switch>
          <Route path={SIGN_UP} component={Registration} />
          <Route path={SIGN_IN} component={Login} />
          <Route path={PROFILE} component={EditProfile} />
          <Route path={ARTICLE} component={Article} />
          <Route path={NEW_ARTICLE} component={CreateArticle} />
          <Route path={EDIT_ARTICLE} component={EditArticle} />
          <Route path={PAGE} component={PostsList} />
          <Route path={HOME} component={PostsList} />
        </Switch>
      </div>
    </Router>
  );
};
