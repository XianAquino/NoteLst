const db = require('../db');

module.exports = {

  startConversation: (params) => {
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
      if (err) console.log(err);
      db.query('UPDATE conversations SET updated_at = CURRENT_TIMESTAMP, no_of_msgs = no_of_msgs + 1 WHERE id = ?',
        params.conversation_id, (err, res) => {
          if (err) console.log(err);
        });
    });
  },

  getContacts: (username, callback) => {
    const queryStatement = `SELECT * FROM
      (SELECT user2 AS username, name, updated_at FROM conversations JOIN
      users ON username = user2 WHERE user1 = ${username} AND no_of_msgs > 0
      UNION SELECT user1 AS username, name, updated_at FROM conversations JOIN users
      ON username = user1 WHERE user2 = ${username} AND no_of_msgs > 0)
      as contacts ORDER BY updated_at DESC` ;
    db.query(queryStatement, (err, res) => {
      if (err) console.log(err);
      callback(res);
    });
  },

  getParticipants: (conversationId, callback) => {
    db.query('SELECT user1, user2 FROM conversations WHERE id = ?', conversationId, (err, res) => {
      if (err) console.log(err);
      callback(res[0]);
    });
  }
};
