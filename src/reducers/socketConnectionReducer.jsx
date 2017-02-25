const socketConnectionReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_TRUE':
      return true;
    default:
      return state;
  }
};

export default socketConnectionReducer;
