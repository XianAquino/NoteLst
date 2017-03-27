const express = require('express');
const socketServer = express();
const http = require('http').Server(socketServer);
const io = require('socket.io')(http);
const messageDB = require('./models/message-model');
const notes = require('./models/note-model');


io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('startConversation', (messageRoomId) => {
    socket.join(messageRoomId);
  });

  socket.on('leaveConversation', (messageRoomId) => {
    socket.leave(messageRoomId);
  });

  socket.on('enterGroup', (groupId) => {
    socket.join(`gr${groupId}`);
  });

  socket.on('shareNote', (groupId, noteId, post) => {
    notes.share(groupId, noteId, (postId) => {
      post.postId = postId;
      io.to(`gr${groupId}`).emit('receiveNote', post);
    });
  });

  socket.on('likePost', (groupId, postId, likes) => {
    io.to(`gr${groupId}`).emit('updatePostLikes', postId, likes);
  });

  socket.on('sendMessage', (messageRoomId, message) => {
    messageDB.saveMessage(message);
    io.emit('updateContacts');
    io.to(messageRoomId).emit('receiveMessage', message);
  });

});

module.exports = http;
