const currentGroupMembersReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_MEMBERS':
      return action.payload;
    case 'ADD_MEMBER':
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default currentGroupMembersReducer;
