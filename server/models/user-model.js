var db = require('../db');
var _ = require('underscore');

module.exports =  {
  getAllUsers : (params,callback) => {
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

  createUser : (params, callback) => {
    db.query('INSERT INTO users SET ?' , params, function(err, res) {
      if(err)console.log("Error",err);
      callback(err, res);
    });
  },

  getUser : (username, callback) => {
    db.query('SELECT * FROM USERS WHERE USERNAME = ? ', username ,function(err, res){
      callback(err,res[0]);
    });
  },

  update : (id,values) => {
    db.query('UPDATE users SET ? WHERE ?',[values,{id:id}],function(err,res){
      if(err)console.log("Error",err);
      console.log("result",res);
    });
  },

  delete : (id) => {
    db.query('DELETE FROM USERS WHERE ID = ?', id, function(err,res){
      if(err)console.log("error",err);
    })
  }
}
