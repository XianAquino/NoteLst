const groupsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_GROUPS':
      return action.payload;
    default:
      return state;
  }
};

export default groupsReducer;
