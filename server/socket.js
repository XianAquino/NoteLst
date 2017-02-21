const express = require('express');
const socketServer = express();
const http = require('http').Server(socketServer);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('enterDirectMessage', (messageRoomId) => {
    socket.join(messageRoomId);
  });

  socket.on('sendMessage', (messageRoomId, message) => {
    io.to(messageRoomId).emit('receiveMessage', message);
  });

});

module.exports = http;
