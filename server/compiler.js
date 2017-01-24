var webpack = require('webpack');
var path = require('path');

var compiler = webpack({
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/static"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      loader: 'babel'
    }]
  }
});

module.exports = compiler;
