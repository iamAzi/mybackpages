const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: path.join(__dirname, '../src/index.jsx'),
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/',
    compress: true,
    port: 9000,
    hot: true
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
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
            }
          }
        ]
      }
    ]
  },
  plugins: [
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new WriteFilePlugin(),
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
      }),
      // new BundleAnalyzerPlugin({
      //   analyzerPort: 8889
      // })
  ],
}