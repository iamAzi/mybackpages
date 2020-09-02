const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.jsx'),
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'babel-loader'
      ]
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  }
}