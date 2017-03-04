const currentConversationReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_CONVERSATION_ID':
      return action.payload;
    default:
      return state;
  }
};

export default currentConversationReducer;
