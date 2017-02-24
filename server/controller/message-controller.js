const message = require('../models/message-model');

module.exports = {
  getMessages: (req, res) => {
    message.retrieveMessages(req.params.conversation_id, (messages) => {
      res.send(messages);
    });
  },

  getContacts: (req, res) => {
    const username = JSON.stringify(req.params.username)
    message.getContacts(username, (users) => {
      res.json(users);
    });
  }
};
