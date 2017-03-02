/* eslint no-console: 0 */
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './config/webpack.config.js';
import hbs from 'handlebars';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import paths from './config/paths';
import counter from 'reducers';
import App from 'components/App';

require('dotenv').config();

console.log(process.env.NODE_ENV);
console.log(process.env.PORT);

const isDeveloping = process.env.NODE_ENV === 'development';
const port = process.env.PORT;
const app = express();

const getDataForClient = () => {
  const store = createStore(counter);
  return {
    preloadedState: store.getState(),
    html: renderToString(
      <Provider store={store}>
        <App/>
      </Provider>
    ),
  };
};

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use('*', function response(req, res) {
    const source = middleware.fileSystem.readFileSync(`${paths.dist}/webpack.hbs`).toString();
    res.write(hbs.compile(source)(getDataForClient()));
    res.end();
  });
} else {
  app.use(express.static(paths.dist));

  // app.use((err, req, res) => {
  //   console.error(err);
  //   res.status(500).send();
  // });

  app.use('*', (req, res) => {
    const source = fs.readFileSync(`${paths.dist}/webpack.hbs`).toString();
    res.write(hbs.compile(source)(getDataForClient()));
    res.end();
  });

  // app.get('/', (req, res) => {
  //   res.send('Hello World!');
  // });
}

app.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
