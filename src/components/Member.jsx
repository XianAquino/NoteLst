import React, { PropTypes } from 'react';
import createConversationId from '../util/createConversationId';
import { browserHistory } from 'react-router';

const chat = (user1, user2) => {
  createConversationId(user1, user2, (conversationId) => {
    browserHistory.push(`/messages/${conversationId}`);
  });
}

const Member = ({id, username, memberUsername, memberName}) => {
  const chatButton = (
    username === memberUsername ? null
    : <button onClick={()=>{chat(username, memberUsername)}}>chat</button>
  );

  return(
    <div>
      <p>{memberName}</p>
      {chatButton}
    </div>
  );
};

Member.propTypes = {
  id: PropTypes.number,
  memberUsername: PropTypes.string,
  memberName: PropTypes.string,
  username: PropTypes.string
};

export default Member;
