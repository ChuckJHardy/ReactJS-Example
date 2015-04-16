var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  debug: true,
  context: __dirname + '/app',
  entry: [
    'webpack/hot/dev-server',
    './main.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
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
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};

