const searchedGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_SEARCH_GROUPS':
      return action.payload;
    default:
      return state;
  }
};

export default searchedGroupsReducer;
