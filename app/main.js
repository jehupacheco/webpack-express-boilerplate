import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from 'components/App';
import { Provider } from 'react-redux';
import counter from 'reducers';

const preloadedState = +window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(counter, preloadedState);
const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootEl
);
