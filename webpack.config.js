const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
    clean: true
  },
  devServer: {
    static: {
        directory: path.resolve(__dirname, 'public')
    },
    port: 8080,
    open: true
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        exclude: /CEPEngine_extensions\.js/,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: './src/static', to: 'static' },
          { from: './src/libs', to: 'libs' }
      ]
    }),
  ],
  resolve: {
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  }
};