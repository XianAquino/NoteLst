const currentGroupMembersReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_MEMBERS':
      return action.payload;
    default:
      return state;
  }
};

export default currentGroupMembersReducer;
