var todos = require('../models/todo-model.js');
var _ = require('underscore');

module.exports = {
  get: function(req,res) {
    var userId = req.params.user_id
    todos.getUserTodos(userId,function(todos){
      res.json(todos);
    });
  },
  create: function(req,res) {
    params = _.extend({user_id:req.params.user_id},req.body);
    todos.create(params);
    res.send('Created');
  },
  getTodo: function(req,res) {
    todoId = req.params.todo_id;
    todos.getTodo(todoId, function(todo){
      res.json(todo);
    });
  },
  update: function(req,res) {
    todoId = req.params.todo_id;
    todos.update(todoId, req.body )
    res.send("Updated");
  },
  delete: function(req,res) {
    todoId = req.params.todo_id;
    todos.delete(todoId)
    res.send("Deleted");
  }
}
