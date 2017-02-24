const messagesReducer = (state = [{message: 'test'}], action) => {
  switch (action.type) {
    case 'LOAD_MESSAGES':
      return action.payload;
    case 'ADD_MESSAGE':
      return [...state, action.payload];
    case 'CLEAR_MESSAGES':
      return [];
    default:
      return state;
  }
};

export default messagesReducer;
