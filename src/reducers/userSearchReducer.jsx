const userSearchReducer = (state = [], action) {
  switch (action.type) {
    case 'LOAD_SEARCH_RESULTS':
      return action.payload;
    default:
      return state;
  }
};

export default userSearchReducer;
