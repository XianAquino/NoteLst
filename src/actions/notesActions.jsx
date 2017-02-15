export const loadNotes = (notes) => {
  return {
    type: 'LOAD_NOTES',
    payload: notes
  };
};

export const addNote = (note) => {
  return {
    type: 'ADD_NOTE',
    payload: note
  };
};

export const deleteNote = (noteId) => {
  return {
    type: 'DELETE_NOTE',
    payload: noteId
  };
};
