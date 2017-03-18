import React from 'react';
import moment from 'moment';

const Message = ({message, sender, userId, date}) => {
  let className = 'message receive'
  if (sender === userId) {
    className = 'message sent'
  }

  return (
    <li className={className}>
      <p>{moment(date).format('LT')}</p>
      <p>{message}</p>
    </li>
  )
};

export default Message;
