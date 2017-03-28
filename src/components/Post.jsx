import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Post = ({id, noteId, likes, title, userAvatar, postedById,
  postedBy, postedAt, like, liked, userId, deletePost}) => {
  return(
    <li>
      <p>{userAvatar}</p><span>{postedBy}</span>
      <p>{postedAt}</p>
      <Link to={`/notes/${noteId}`}>{title}</Link>
      <p>likes: <span>{likes}</span></p>
      {
        userId !== postedById ? null
          : <button onClick={() => {deletePost(id, noteId)}}>Delete</button>
      }
      {
        liked ? <button onClick={() => {like(id, (likes - 1), 'unlike')}}>Unlike</button>
          : <button onClick={() => {like(id, (likes + 1), 'like')}}>Like</button>
      }
    </li>
  );
};

Post.proptypes = {
  id: PropTypes.number,
  likes: PropTypes.number,
  title: PropTypes.string,
  userAvatar: PropTypes.string,
  postedById: PropTypes.number,
  postedBy: PropTypes.string,
  postedAt: PropTypes.instanceOf(Date),
  likes: PropTypes.func,
  liked: PropTypes.number,
  userId: PropTypes.number,
  deletePost: PropTypes.func
}

export default Post;
