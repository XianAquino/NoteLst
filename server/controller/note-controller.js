const notes = require('../models/note-model.js');
const _ = require('underscore');

module.exports = {
  get: (req, res) => {
    const user = req.params.user_id;
    notes.getUserNotes(user,function(notes) {
      res.json(notes);
    });
  },
  create: (req, res) => {
    const user = req.params.user_id;
    const params = _.extend({user_id: user}, req.body);
    notes.createNote(params, (note) => {
      res.send(note)
    });
  },
  getNote: (req, res) => {
    notes.getNote(req.params.note_id,function(note) {
      res.json(note);
    });
  },
  update: (req, res) => {
    const noteId = req.params.note_id;
    notes.update(noteId, req.body);
    res.send('Updated');
  },
  delete: (req, res) => {
    const noteId = req.params.note_id;
    notes.delete(noteId);
    res.send('Deleted');
  }
};
