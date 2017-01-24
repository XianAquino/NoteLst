var express = require('express');
var router = require('./routes.js');
var parser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config.js');

var port = 3030;
var ip = '127.0.0.1';

var app = new WebpackDevServer(webpack(config), {
  contentBase: "public",
  publicPath: "/static",
  stats: {color: true}
});

app.use(parser.json());
app.use("/", express.static("static"));
app.use('/api', router);

app.listen(port,ip);
console.log(`Listening on port: ${port}`);
