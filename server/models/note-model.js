var db = require('../db');

module.exports = {
  getUserNotes: function(userId,callback){
    db.query('SELECT * FROM notes WHERE user_id = ?', userId, function(err,res){
      if(err) throw err;
      callback(res);
    });
  },
  createNote: function(params) {
    db.query('INSERT into notes SET ?', params, function(err,res){
      if(err)throw err;
      console.log(res);
    })
  },
  getNote: function(id,callback){
    db.query('SELECT * FROM notes WHERE id = ?', id, function(err,res){
      if(err)throw err;
      callback(res[0]);
    })
  },
  update: function(id,values){
    db.query('UPDATE notes SET ? WHERE ?',[values,{id:id}], function(err,res){
      if(err)throw err;
      console.log(res);
    })
  },
  delete: function(id){
    db.query('DELETE FROM notes WHERE id = ?', id, function(err,res){
      if(err)throw err;
      console.log(res);
    })
  }

}
