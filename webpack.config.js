var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/src/public');
var APP_DIR = path.resolve(__dirname, 'client/src/app');

module.exports = {
  entry: [
  APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
      loaders: [
          {
              exclude: /node_modules/,
              include: APP_DIR,
              test: /\.js$/,
              loader: 'babel',
              query: {
                  presets: ['react', 'es2015']
              }
          }, {
              test: /\.scss$/,
              loaders: ["style-loader", "css-loader", "sass-loader"]
          },{
              test: /\.less$/,
              loader: "style-loader!css-loader!less-loader"
          }
      ]
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  }
};