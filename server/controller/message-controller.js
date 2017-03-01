const message = require('../models/message-model');
const createSha1Id = require('../util/createSha1Id.js');

module.exports = {
  getMessages: (req, res) => {
    message.retrieveMessages(req.params.conversation_id, (messages) => {
      res.json(messages);
    });
  },

  getContacts: (req, res) => {
    const username = JSON.stringify(req.params.username)
    message.getContacts(username, (users) => {
      res.json(users);
    });
  },

  startConverstation: (req, res) => {
    const {user1, user2} = req.body;
    // to generate a unique key for each conversation
    // compare username and sender and hash it using sha1
    let conversation;
    if(user1 < user2) {
      conversation = {
        id: createSha1Id(user1 + user2),
        user1: user1,
        user2: user2
      };
    } else {
      conversation = {
        id: createSha1Id(user2 + user1),
        user1: user2,
        user2: user1
      };
    }
    message.startConversation(conversation);
    res.json(conversation.id);
  }
};
