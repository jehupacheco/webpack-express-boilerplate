import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import paths from './paths';

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    paths.appMainJs
  ],
  output: {
    path: paths.dist,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: 'body',
      filename: 'webpack.hbs'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.json?$/,
      loader: 'json',
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]',
    }, {
      test: /\.hbs$/,
      loader: 'handlebars',
    }]
  },
  resolve: {
    alias: {
      components: paths.appComponents,
      reducers: paths.appReducers,
    },
    extensions: ['.js', '.json', '.jsx', ''],
  },
};
