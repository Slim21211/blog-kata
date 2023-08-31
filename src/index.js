import { React } from 'react';
import { createRoot } from 'react-dom/client';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { articleReducer } from './Redux/Reducers/fetch-articles-reducer';
import { oneArticleReducer } from './Redux/Reducers/fetch-one-article-reducer';
import { App } from './Components/App/app';

const rootReducer = combineReducers({
  articleReducer,
  oneArticleReducer,
});

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log('Middleware', store.getState());
  return result;
};

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, reduxThunk));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
