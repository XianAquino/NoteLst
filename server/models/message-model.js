const db = require('../db');

module.exports = {

  startConverstation: (params) => {
    db.query('SELECT * FROM conversations WHERE id = ? ', params.id, (err, res) => {
      if(!res.length) db.query('INSERT INTO conversations SET ?', params)
    });
  },

  retrieveMessages: (conversationId, callback) => {
    db.query('SELECT * FROM  messages WHERE conversation_id = ?' , conversationId, (err, res) => {
      if(err) console.log(err);
      callback(res);
    });
  },

  saveMessage: (params) => {
    db.query('INSERT INTO messages SET ?', params, (err, res) => {
      if(err) console.log(err);
    });
  }
};