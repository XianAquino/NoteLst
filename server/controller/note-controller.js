var notes = require('../models/note-model.js');
var _ = require('underscore');

module.exports = {
  get: function(req, res) {
    var user = req.params.user_id;
    notes.getUserNotes(user,function(notes) {
      res.json(notes);
    });
  },
  create: function(req, res) {
    var user = req.params.user_id;
    var params = _.extend({user_id:user},req.body);
    notes.createNote(params);
    res.send("Created");
  },
  getNote: function(req, res) {
    notes.getNote(req.params.note_id,function(note) {
      res.json(note);
    });
  },
  update: function(req, res) {
    var noteId = req.params.note_id;
    notes.update(noteId, req.body);
    res.send('Updated');
  },
  delete: function(req, res) {
    var noteId = req.params.note_id;
    notes.delete(noteId);
    res.send('Deleted');
  }
}
