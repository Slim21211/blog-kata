import { React } from 'react';
import { createRoot } from 'react-dom/client';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';

import { articleReducer } from './Redux/Reducers/fetch-articles-reducer';
import { oneArticleReducer } from './Redux/Reducers/fetch-one-article-reducer';
import { registrationReducer } from './Redux/Reducers/fetch-registration-reducer';
import { loginReducer } from './Redux/Reducers/fetch-login-reducer';
import { getUserReducer } from './Redux/Reducers/fetch-get-user-reducer';
import { createArticleReducer } from './Redux/Reducers/fetch-create-article-reducer';
import { deleteArticleReducer } from './Redux/Reducers/fetch-delete-article-reducer';
import { App } from './Components/App/app';

const rootReducer = combineReducers({
  articleReducer,
  oneArticleReducer,
  registrationReducer,
  loginReducer,
  getUserReducer,
  createArticleReducer,
  deleteArticleReducer,
});

const devTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log('Middleware', store.getState());
  return result;
};

const store = createStore(rootReducer, devTool(applyMiddleware(loggerMiddleware, reduxThunk)));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
