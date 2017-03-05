import React from 'react';

const Message = ({message, sender, userId, date}) => {
  let className = 'received-message'
  if (sender === userId) {
    className = 'sent-message'
  }

  return (
    <li className={className}>
      <p>{date}</p>
      <p>{message}</p>
    </li>
  )
};

export default Message;
