var webpack = require('webpack');
var path = require('path');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var argv = require('minimist')(process.argv.slice(2));
const isWeb = (argv && argv.target === 'web');

let options  = {
  entry: [
      'regenerator-runtime/runtime',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index',
  ],
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style!css!sass' },
      { test: /\.json$/,  loader: 'json-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader', options: { limit: 8192 }}
    ],
  },
  resolve: {
    extensions: ['', '.js']
  },
  stats: {
      warnings: false
  },
  output: {
    path: path.join(__dirname, '/src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
        Promise: 'es6-promise-promise'
    }),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    })
  ],
};

if (isWeb) {
    options.node = {
        fs: 'empty'
    }
}
options.target = webpackTargetElectronRenderer(options);
module.exports = options;