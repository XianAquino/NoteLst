const userSearchReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_SEARCH_RESULTS':
      return action.payload;
    case 'CLEAR_SEARCH_RESULTS':
      return [];
    default:
      return state;
  }
};

export default userSearchReducer;
