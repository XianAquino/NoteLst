export const changeConversationID = (conversationId) => {
  return {
    type: 'UPDATE_CONVERSATION_ID',
    payload: conversationId
  };
};
