import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

import reducers from './reducers/root_reducers'
import App from './App';
import * as serviceWorker from './serviceWorker';

import "./assets/scss/black-dashboard-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(promise, thunk))(createStore)

ReactDOM.render(
  <React.StrictMode>
      <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
