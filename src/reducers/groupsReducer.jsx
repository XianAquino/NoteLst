const groupsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_GROUPS':
      return action.payload;
    case 'ADD_GROUP':
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default groupsReducer;
