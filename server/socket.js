const express = require('express');
const socketServer = express();
const http = require('http').Server(socketServer);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('user connected');

});

module.exports = http;
