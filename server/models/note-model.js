const db = require('../db');

module.exports = {
  getUserNotes: (userId, callback) => {
    db.query('SELECT * FROM notes WHERE user_id = ?', userId, (err, res) => {
      if(err) throw err;
      callback(res);
    });
  },
  createNote: (params, callback) => {
    db.query('INSERT into notes SET ?', params, (err, res) => {
      if(err)throw err;
      callback(res);
    })
  },
  getNote: (id, callback) => {
    db.query('SELECT * FROM notes WHERE id = ?', id, (err, res) => {
      if(err)throw err;
      callback(res[0]);
    })
  },
  search: (userId, target, callback) => {
    const sql = `SELECT * FROM notes WHERE user_id = ${userId} AND title LIKE '%${target}%'`;
    db.query(sql, (err, res) => {
      if(err) throw err;
      callback(res);
    });
  },
  update: (id, values) => {
    db.query('UPDATE notes SET ? WHERE ?',[values, {id: id}], (err, res) => {
      if(err)throw err;
      console.log(res);
    })
  },
  share: (groupId, noteId, callback) => {
    db.query('UPDATE notes SET shared = shared + 1 WHERE id = ?', noteId, (err, res) => {
      if(err)throw err;
      const values = {group_id: groupId, note_id: noteId};
      db.query('INSERT INTO group_notes SET ?', values, (err, res) => {
        if(err)throw err;
        callback(res.insertId);
      })
    })
  },
  delete: (id) => {
    db.query('DELETE FROM notes WHERE id = ?', id, (err, res) => {
      if(err)throw err;
      console.log(res);
    })
  }
};
