const express = require('express');
const router = require('./routes.js');
const parser = require('body-parser');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');
const session = require('express-session');
const path = require('path');
const socket = require('./socket');

const port = 3030;
const ip = '127.0.0.1';
const socketPort = 3010;

const app = new WebpackDevServer(webpack(config), {
  publicPath: '/static',
  stats: {color: true},
  historyApiFallback: true,
  proxy: {"/socket": `http://localhost:${socketPort}`},
});

const oneWeek = 604800000;

app.use(session({
  secret: 'notes secret',
  resave: false,
  saveUninitialized: true,
  maxAge: oneWeek
}))

app.use(parser.json());
app.use('/api', router);
app.use(express.static('static'));

app.listen(port);
console.log(`Listening on port: ${socketPort}`);

socket.listen(socketPort, () => {
  console.log(`Sockets Listening on port: ${socketPort}`);
});
