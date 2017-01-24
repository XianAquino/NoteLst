var path = require('path');

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, 'static'),
    filename: "bundle.js",
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
}
