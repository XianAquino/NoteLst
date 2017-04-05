import React, { PropTypes } from 'react';
import createConversationId from '../util/createConversationId';
import { browserHistory } from 'react-router';
import { Avatar, ListItem } from 'material-ui';

const chat = (user1, user2) => {
  createConversationId(user1, user2, (conversationId) => {
    browserHistory.push(`/messages/${conversationId}`);
  });
}

const Member = ({id, username, memberUsername, memberName, avatar}) => {
  const chatButton = (
    username === memberUsername ? null
    : <i onClick={()=>{chat(username, memberUsername)}} className='chat-icon material-icons'>chat</i>
  );

  const defaultAvatar='http://res.cloudinary.com/de7lidb1d/image/upload/c_crop,w_443/v1488676774/users/style_icons_product_human_best_do1.png';

  return(
    <ListItem
      leftAvatar={
        <Avatar
          src={avatar || defaultAvatar}
          size={30}
          style={{margin: 5}}
        />
      }
    >
    {memberName}
    {chatButton}
    </ListItem>
  );
};

Member.propTypes = {
  id: PropTypes.number,
  memberUsername: PropTypes.string,
  memberName: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string
};

export default Member;
