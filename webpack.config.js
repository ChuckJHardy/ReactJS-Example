var webpack = require('webpack');
var env = require('./env');

module.exports = {
  devtool: 'eval-source-map',
  debug: true,
  context: __dirname + '/',
  entry: [
    'webpack/hot/dev-server',
    './main.jsx'
  ],
  output: {
    path: __dirname + '/bundle',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$/,
        loader: 'jsxhint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loaders: ['jsx?harmony']
      },
      {
        test: /\.(scss|css)?$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=16384&mimetype=image/png'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('0.0.1'),
      __FIREBASE_URL__: JSON.stringify(env.FIREBASE_URL),
      __LOCAL_STORAGE_KEY__: JSON.stringify(env.LOCAL_STORAGE_KEY),
      __LOCKDOWN_KEY__: JSON.stringify(env.LOCKDOWN_KEY),
      __TEST__: false,
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};

