const todos = require('../models/todo-model.js');
const _ = require('underscore');

module.exports = {
  get: (req, res) => {
    const userId = req.params.user_id
    const date = req.query.date;
    todos.getUserTodos(userId, date, (todos)=> {
      res.json(todos);
    });
  },
  create: (req,res) => {
    const params = _.extend({user_id:req.params.user_id}, req.body);
    todos.create(params, (todo) => {
      res.send(todo);
    });
  },
  getTodo: (req,res) => {
    const todoId = req.params.todo_id;
    todos.getTodo(todoId, (todo) => {
      res.json(todo);
    });
  },
  update: (req,res) => {
    const todoId = req.params.todo_id;
    todos.update(todoId, req.body)
    res.send("Updated");
  },
  delete: (req,res) => {
    const todoId = req.params.todo_id;
    todos.delete(todoId)
    res.send("Deleted");
  }
}
