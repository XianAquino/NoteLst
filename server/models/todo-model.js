const db = require('../db');

module.exports = {
  getUserTodos: (user, date,  callback) => {
    const sql = 'SELECT * FROM todos WHERE user_id = ? and date = ?';
    db.query(sql, [user, date], (err, res) => {
      if(err)throw err;
      callback(res);
    });
  },

  create: (params, callback) => {
    db.query('INSERT INTO todos SET ?', params, (err, res) => {
      if(err)throw err;
      callback(res);
    });
  },

  getTodo: (id, callback) => {
    db.query('SELECT * FROM todos WHERE id = ?', id, (err, res) => {
      if(err)throw err;
      callback(res[0]);
    });
  },

  update: (id,values) => {
    db.query('UPDATE todos SET ? WHERE ?',[values, {id: id}], (err, res) => {
      if(err)throw err;
      console.log(res);
    });
  },

  delete: (id) => {
    db.query('DELETE from todos WHERE id = ?', id, (err, res) => {
      if(err)throw err;
      console.log(res);
    });
  }

}
