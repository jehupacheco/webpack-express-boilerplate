import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import paths from './paths';

require('dotenv').config();

module.exports = {
  entry: {
    main: paths.appMainJs,
    server: paths.appServer,
  },
  target: 'node',
  output: {
    path: paths.dist,
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: 'body',
      filename: 'webpack.hbs'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
    }, {
      test: /\.hbs$/,
      loader: 'handlebars',
    }]
  },
  resolve: {
    modulesDirectories: [paths.appNodeModules],
    alias: {
      components: paths.appComponents,
      reducers: paths.appReducers,
    },
    resolveLoader: {
      alias: {
        hbs: 'handlebars-loader',
      },
    },
    extensions: ['.js', '.json', '.jsx', ''],
  },
  postcss: [
    require('autoprefixer')
  ],
};
