import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from 'components/App';
import {Provider} from 'react-redux';
import counter from 'reducers';

const store = createStore(counter);
const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootEl
);
