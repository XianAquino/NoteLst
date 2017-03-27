import React, { PropTypes } from 'react';

const Post = ({id, likes, title, userAvatar, postedBy, postedAt, like}) => {
  return(
    <li>
      <p>{userAvatar}</p><span>{postedBy}</span>
      <p>{postedAt}</p>
      <p>{title}</p>
      <p>likes: <span>{likes}</span></p>
      <button onClick={() => {like(id, (likes + 1))}}>Like</button>
    </li>
  );
};

Post.proptypes = {
  id: PropTypes.number,
  likes: PropTypes.number,
  title: PropTypes.string,
  userAvatar: PropTypes.string,
  postedBy: PropTypes.string,
  postedAt: PropTypes.instanceOf(Date),
  like: PropTypes.func
}

export default Post;
