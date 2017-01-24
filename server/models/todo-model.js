var db = require('../db');

module.exports = {
  getUserTodos: function(user, callback){
      db.query('SELECT * FROM todos WHERE user_id = ?',user, function(err,res) {
        if(err)throw err;
        callback(res);
      });
  },

  create: function(params){
    db.query('INSERT INTO todos SET ?', params, function(err,res) {
      if(err)throw err;
      console.log(res);
    });
  },

  getTodo: function(id, callback){
    db.query('SELECT * FROM todos WHERE id = ?', id, function(err,res) {
      if(err)throw err;
      callback(res[0]);
    });
  },

  update: function(id,values) {
    db.query('UPDATE todos SET ? WHERE ?',[values,{id:id}], function(err,res) {
      if(err)throw err;
      console.log(res);
    });
  },

  delete: function(id) {
    db.query('DELETE from todos WHERE id = ?', id, function(err,res) {
      if(err)throw err;
      console.log(res);
    });
  }

}
