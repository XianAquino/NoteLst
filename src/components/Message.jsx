import React from 'react';

const Message = ({message, sender, userId, date}) => {
  let className = 'message receive'
  if (sender === userId) {
    className = 'message sent'
  }

  return (
    <li className={className}>
      <p>{date}</p>
      <p>{message}</p>
    </li>
  )
};

export default Message;
