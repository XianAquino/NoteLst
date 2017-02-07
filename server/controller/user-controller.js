var users = require('../models/user-model.js');

module.exports = {
  get: function(req, res) {
    var query = req.query;
    users.getAllUsers(query,function(users){
      res.json(users);
    })
  },
  create: function(req, res) {
    var params = req.body;
    console.log(params);
    users.createUser(params);
    res.send("Created!");
  },

  getUser: function(req, res) {
    var id = req.params.user_id;
    users.getUser(id,function(err,info){
      res.json(info);
    })
  },

  update: function(req, res) {
    var id = req.params.user_id;
    users.update(id,req.body);
    res.send("Updated!");

  },
  delete: function(req, res) {
    var id = req.params.user_id;
    users.delete(id);
    res.send("Deleted!");
  }
}
