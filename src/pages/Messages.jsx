import React from 'react';
import io from 'socket.io-client';

const socket = io('/socket');

const Messages = () => {
  return(
    <div>connected</div>
  )
};

export default Messages;
