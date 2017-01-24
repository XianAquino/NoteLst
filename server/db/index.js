var mysql = require('mysql');
var credentials = require('../config.js')

var connection = mysql.createConnection({
  user: credentials.mysql.user,
  password: credentials.mysql.password,
  database: credentials.mysql.database
})

connection.connect(function(err){
  if(err) console.log("error:", err);
  console.log("Connected to note database");
});

module.exports = connection;
