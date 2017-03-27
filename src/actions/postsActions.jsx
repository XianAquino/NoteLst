export const loadPosts = (posts) => {
  return{
    type: 'LOAD_POSTS',
    payload: posts
  };
};
