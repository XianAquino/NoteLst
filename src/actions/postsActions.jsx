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

export const updatePost = (postId, property) => {
  return{
    type: 'UPDATE_POST',
    payload: property,
    targetPost: postId,
  };
};

export const deletePost = (postId) => {
  return{
    type: 'DELETE_POST',
    payload: postId,
  };
};
