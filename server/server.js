const express = require('express');
const router = require('./routes.js');
const parser = require('body-parser');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');
const session = require('express-session');
const path = require('path');

const port = 3030;
const ip = '127.0.0.1';

const app = new WebpackDevServer(webpack(config), {
  publicPath: '/static',
  stats: {color: true},
  historyApiFallback: true
});

app.use(session({
  secret: 'notes secret',
  resave: false,
  saveUninitialized: true
}))

app.use(parser.json());
app.use('/api', router);
app.use(express.static('static'));

app.listen(port,ip);
console.log(`Listening on port: ${port}`);
