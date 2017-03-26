var router = require('express').Router();
var users = require('./controller/user-controller.js');
var todos = require('./controller/todo-controller.js');
var notes = require('./controller/note-controller.js');
var messsages = require('./controller/message-controller.js');
var groups = require('./controller/group-controller.js');

router.post('/signUp', users.create);
router.post('/login', users.login);
router.get('/logout', users.logout);
router.get('/isAuthenticated', users.checkAuth);

router.get('/users', users.get);
router.get('/users/:username', users.getUser);
router.put('/users/:user_id', users.update);
router.delete('/users/:user_id', users.delete);

router.get('/users/:user_id/todos', todos.get);
router.post('/users/:user_id/todos', todos.create);
router.get('/users/:user_id/todos/weekly', todos.getByWeek);
router.get('/users/:user_id/todos/:todo_id', todos.getTodo);
router.put('/todo/:todo_id', todos.update);
router.delete('/todo/:todo_id', todos.delete);

router.get('/users/:user_id/notes', notes.get);
router.post('/users/:user_id/notes', notes.create);
router.get('/users/:user_id/notes/:note_id', notes.getNote);
router.put('/notes/:note_id', notes.update);
router.delete('/notes/:note_id', notes.delete);

router.get('/conversations/:conversation_id', messsages.getMessages);
router.get('/conversations/:conversation_id/participants', messsages.getParticipants);
router.post('/conversations/', messsages.startConverstation);
router.get('/contacts/:username', messsages.getContacts);

router.get('/groups', groups.get);
router.post('/groups', groups.create);
router.get('/groups/:group_id', groups.getGroup);
router.get('/groups/:group_id/members', groups.getMembers);
router.post('/groups/:group_id/join/:user_id', groups.join);
router.put('/groups/:group_id', groups.updateGroup);
router.delete('/groups/:group_id', groups.deleteGroup);

module.exports = router;
