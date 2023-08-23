import { React } from 'react';
import { createRoot } from 'react-dom/client';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { articleReducer } from './Redux/Reducers/fetch-articles-reducer';
import { App } from './Components/App/app';

const rootReducer = combineReducers({
  articleReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
