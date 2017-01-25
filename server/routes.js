var router = require('express').Router();
var users = require('./controller/user-controller.js');
var todos = require('./controller/todo-controller.js');
var notes = require('./controller/note-controller.js');


router.get('/users', users.get);
router.post('/users', users.create);
router.get('/users/:user_id', users.getUser);
router.put('/users/:user_id', users.update);
router.delete('/users/:user_id', users.delete);

router.get('/users/:user_id/todos', todos.get);
router.post('/users/:user_id/todos', todos.create);
router.get('/users/:user_id/todos/:todo_id', todos.getTodo);
router.put('/todo/:todo_id', todos.update);
router.delete('/todo/:todo_id', todos.delete);

router.get('/users/:user_id/notes', notes.get);
router.post('/users/:user_id/notes', notes.create);
router.get('/users/:user_id/notes/:note_id', notes.getNote);
router.put('/notes/:note_id', notes.update);
router.delete('/notes/:note_id', notes.delete);

module.exports = router;