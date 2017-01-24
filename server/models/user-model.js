var db = require('../db');
var _ = require('underscore');

module.exports =  {
  getAllUsers : function(params,callback) {
    if(_.isEmpty(params)){
      db.query('SELECT * FROM USERS', function(err,res) {
        callback(res);
      });
    }else{
      db.query('SELECT * FROM USERS WHERE ?', params, function(err,res) {
        callback(res);
      })
    }
  },

  createUser : function(params) {
    db.query('INSERT INTO users SET ?' , params, function(err, res) {
      if(err)console.log("Error",err);
      console.log("result",res);
    });
  },

  getUser : function(id,callback) {
    db.query('SELECT * FROM USERS WHERE ID = ? ', id ,function(err, res){
      console.log("res",res);
      callback(err,res[0]);
    });
  },

  update : function(id,values) {
    db.query('UPDATE users SET ? WHERE ?',[values,{id:id}],function(err,res){
      if(err)console.log("Error",err);
      console.log("result",res);
    });
  },

  delete : function(id) {
    db.query('DELETE FROM USERS WHERE ID = ?', id, function(err,res){
      if(err)console.log("error",err);
    })
  }
}
