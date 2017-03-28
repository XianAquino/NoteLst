import React, { PropTypes } from 'react';

const Post = ({id, likes, title, userAvatar, postedBy, postedAt, like, liked}) => {
  return(
    <li>
      <p>{userAvatar}</p><span>{postedBy}</span>
      <p>{postedAt}</p>
      <p>{title}</p>
      <p>likes: <span>{likes}</span></p>
      {
        liked ? <button onClick={() => {like(id, (likes - 1))}}>Unlike</button>
          : <button onClick={() => {like(id, (likes + 1))}}>Like</button>
      }
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
  likes: PropTypes.func,
  liked: PropTypes.number
}

export default Post;
