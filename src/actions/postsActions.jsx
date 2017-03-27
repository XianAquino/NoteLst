export const loadPosts = (posts) => {
  return{
    type: 'LOAD_POSTS',
    payload: posts
  };
};

export const addPost = (post) => {
  return{
    type: 'ADD_POST',
    payload: post
  };
};
