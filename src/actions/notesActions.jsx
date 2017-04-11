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

export const updateNote = (noteId) => {
  return {
    type: 'UPDATE_NOTE',
    payload: noteId
  };
};

export const deleteNote = (noteId) => {
  return {
    type: 'DELETE_NOTE',
    payload: noteId
  };
};

export const searchNotes = (notes) => {
  return {
    type: 'LOAD_NOTES_SEARCH_RESULTS',
    payload: notes
  };
};
