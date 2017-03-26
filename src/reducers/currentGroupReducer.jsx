const currentGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_GROUP_INFO':
      return action.payload;
    default:
      return state;
  }
};

export default currentGroupReducer;
