const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '../src/index.jsx'),
  mode: 'production',
  output: {
    filename: '[name]-[chunkhash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
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
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '',
              // outputPath: '../dist'
            }
          }
        ]
      }
    ]
  },
  plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../index.html'),
        filename: path.join(__dirname, '../static/index.html'),
        inject: true,
      }),
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'react',
            entry: '//unpkg.com/react@16/umd/react.production.min.js',
            global: 'React'
          },
          {
            module: 'react-dom',
            entry: '//unpkg.com/react-dom@16/umd/react-dom.production.min.js',
            global: 'ReactDOM'
          }
        ]
      })
  ],
}