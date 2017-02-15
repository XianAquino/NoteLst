const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_NOTES':
      return action.payload;
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'DELETE_NOTE':
      return state.filter( note => note.id !== action.payload );
    default:
      return state;
  }
}

export default notesReducer;
