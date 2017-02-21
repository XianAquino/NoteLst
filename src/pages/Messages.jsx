import React from 'react';
import DirectMessages from '../components/DirectMessages.jsx';
import { Link } from 'react-router';

const Messages = ({children}) => {
  return(
    <div>connected
      <Link to='/messages/123'>Chat</Link>
      {children}
    </div>
  )
};

export default Messages;
