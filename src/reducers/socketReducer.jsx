const socketReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE_SOCKET':
      return action.payload;
    default:
      return state;
  }
};

export default socketReducer;
