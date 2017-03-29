const express = require('express');
const socketServer = express();
const http = require('http').Server(socketServer);
const io = require('socket.io')(http);
const messageDB = require('./models/message-model');
const notes = require('./models/note-model');
const groups = require('./models/group-model');
const posts = require('./models/post-model');

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

  socket.on('newMember', (groupId, user) => {
    groups.join(groupId, user.userId);
    io.to(`gr${groupId}`).emit('addNewMember', groupId, user);
  })

  socket.on('shareNote', (groupId, noteId,  post) => {
    notes.share(groupId, noteId, (postId) => {
      post.postId = postId;
      io.to(`gr${groupId}`).emit('receiveNote', post);
    });
  });

  socket.on('likePost', (groupId, postId, userId, likes, condition) => {
    let likeStatus = {
      likes,
      postedBy: userId
    }
    if (condition === 'like') {
      posts.likePost({post_id: postId, user_id: userId});
      likeStatus.liked = 1;
    } else {
      posts.unlikePost({post_id: postId, user_id: userId});
      likeStatus.liked = 0;
    }
    io.to(`gr${groupId}`).emit('updatePostLikes', postId, likeStatus);
  });

  socket.on('deletePost', (groupId, postId, noteId) => {
    posts.deletePost(postId, noteId);
    io.to(`gr${groupId}`).emit('deletedPost', postId);
  });

  socket.on('sendMessage', (messageRoomId, message) => {
    messageDB.saveMessage(message);
    io.emit('updateContacts');
    io.to(messageRoomId).emit('receiveMessage', message);
  });

});

module.exports = http;
