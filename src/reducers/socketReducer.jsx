const socketReducer = (state = {}, action) => {
  switch (action) {
    case 'INITIALIZE_SOCKET':
      return action.payload;
    default:
      return state;
  }
};

export default socketReducer;
