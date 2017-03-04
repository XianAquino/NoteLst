const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      loader: 'babel'
    },
    {
      test: /\.css?$/,
      loaders: ['style', 'css'],
    }]
  }
}
