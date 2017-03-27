const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_POSTS':
      action.payload;
    default:
      return state;
  }
};

export default postReducer;
