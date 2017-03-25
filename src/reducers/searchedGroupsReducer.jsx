const searchedGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_SEARCH_GROUPS':
      return action.payload;
    case 'REMOVE_SEARCH_GROUPS':
      return state.filter(group => group.group_id !== action.payload);
    default:
      return state;
  }
};

export default searchedGroupsReducer;
