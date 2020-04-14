import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import { BASE_URL } from './config';
import { store } from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
