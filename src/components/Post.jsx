import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Paper, Divider, Avatar, Chip } from 'material-ui';
import moment from 'moment';

const muiStyles = {
  chip: {
    margin: '6px'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

const Post = ({id, noteId, likes, title, userAvatar, postedById,
  postedBy, postedAt, like, liked, userId, deletePost}) => {

  const defaultAvatar='http://res.cloudinary.com/de7lidb1d/image/upload/c_crop,w_443/v1488676774/users/style_icons_product_human_best_do1.png';
  const unlikeBtn = (
    <Chip
      backgroundColor='#2CC7DE'
      labelColor='#FFF'
      onTouchTap={() => {like(id, (likes - 1), 'unlike')}}
      style={muiStyles.chip}
    >
      Unlike
    </Chip>
  );
  const likeBtn = (
    <Chip
      backgroundColor='#2CC7DE'
      labelColor='#FFF'
      onTouchTap={() => {like(id, (likes + 1), 'like')}}
      style={muiStyles.chip}
    >
      Like
    </Chip>
  );

  const actionBtn = liked ? unlikeBtn : likeBtn;

  return(
    <li className='post col-xs-12 col-sm-6 col-md-6 col-lg-6'>
      <Paper>
        <div className='post-header'>
          <Avatar
            src={userAvatar|| defaultAvatar}
            size={30}
            style={{margin:'5px'}}
          /><span>{postedBy}</span>
          {
            userId !== postedById ? null
              : <i onClick={() => {deletePost(id, noteId)}} className='material-icons'>cancel</i>
          }
        </div>
        <Divider/>
        <div className='post-content'>
          <p>Posted: {moment(postedAt).startOf('day').fromNow()}</p>
          <Link to={`/notes/${noteId}`}>{title}</Link>
        </div>
        <div style={muiStyles.wrapper}>
          <Chip
            backgroundColor='#008A7D'
            labelColor='#FFF'
            style={muiStyles.chip}
          ><Avatar
            size={32}
            color='#FFF'
            backgroundColor='#175057'
            >{likes}
            </Avatar>
            likes
          </Chip>
          {actionBtn}
        </div>
      </Paper>
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
