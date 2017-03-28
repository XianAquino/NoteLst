const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_POSTS':
      return action.payload;
    case 'ADD_POST':
      return [action.payload, ...state];
    case 'UPDATE_POST':
      return state.map(post =>
        post.postId !== action.targetPost ? post
        : Object.assign(post, action.payload)
      );
    case 'DELETE_POST':
      return state.filter(post => post.postId !== action.payload);
    default:
      return state;
  }
};

export default postReducer;
