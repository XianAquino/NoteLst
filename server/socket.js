const express = require('express');
const socketServer = express();
const http = require('http').Server(socketServer);
const io = require('socket.io')(http);
const messageDB = require('./models/message-model');

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('startConversation', (messageRoomId) => {
    messageDB.startConverstation({id: messageRoomId});
    socket.join(messageRoomId);
  });

  socket.on('sendMessage', (messageRoomId, message) => {
    messageDB.saveMessage(message);
    console.log("receive");
    io.to(messageRoomId).emit('receiveMessage', message);
  });

});

module.exports = http;
