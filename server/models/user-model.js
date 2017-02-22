var db = require('../db');
var _ = require('underscore');

module.exports =  {
  getUsers: (query, callback) => {
    if(_.isEmpty(query)){
      db.query('SELECT * FROM users', (err, res) => {
        callback(res);
      });
    }else{
      db.query(`SELECT * FROM users WHERE name LIKE '%${query.name}%'`, (err, res) => {
        callback(res);
      });
    }
  },

  createUser: (params, callback) => {
    db.query('INSERT INTO urtsers SET ?' , params, (err, res) => {
      if(err)console.log("Error",err);
      callback(err, res);
    });
  },

  getUser: (username, callback) => {
    db.query('SELECT * FROM USERS WHERE USERNAME = ? ', username, (err, res) => {
      callback(err,res[0]);
    });
  },

  update: (id, values) => {
    db.query('UPDATE users SET ? WHERE ?', [values, {id: id}], (err, res) => {
      if(err)console.log("Error",err);
      console.log("result",res);
    });
  },

  delete: (id) => {
    db.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
      if(err)console.log("error",err);
    });
  }
};
