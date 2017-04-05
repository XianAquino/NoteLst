import React, {PropTypes} from 'react';
import Message from '../components/Message';

const Messages = ({userId, messages}) => {
  return(
    <div className='messages'>
      <ul>
      {
        messages.map((content, i) =>
          <Message
            key={i}
            message={content.message}
            sender={content.sender}
            date={content.created_at}
            userId={userId}
          />
        )
      }
      </ul>
    </div>
  )
};

Messages.propTypes = {
  messages: PropTypes.array,
  userId: PropTypes.number
};

export default Messages;
