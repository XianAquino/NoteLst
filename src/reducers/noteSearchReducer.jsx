const noteSearchReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_NOTES_SEARCH_RESULTS':
      return action.payload;
    default:
      return state;
  }
};

export default noteSearchReducer;
