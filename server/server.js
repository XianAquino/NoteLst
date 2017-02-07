const express = require('express');
const router = require('./routes.js');
const parser = require('body-parser');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');
const session = require('express-session');

var port = 3030;
var ip = '127.0.0.1';

var app = new WebpackDevServer(webpack(config), {
  publicPath: "/static",
  stats: {color: true},
  historyApiFallback: true
});

app.use(session({
  secret: 'notes secret',
  resave: false,
  saveUninitialized: true
}))
app.use(parser.json());
app.use("/", express.static("static"));
app.use('/api', router);

app.listen(port,ip);
console.log(`Listening on port: ${port}`);
