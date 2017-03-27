const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_POSTS':
      return action.payload;
    case 'ADD_POST':
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default postReducer;
