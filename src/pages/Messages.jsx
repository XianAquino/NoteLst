import React from 'react';
import { Link } from 'react-router';
import UserSearch from '../components/UserSearch';

const Messages = ({children}) => {
  return(
    <div>
      <UserSearch/>
      <Link to='/messages/123'>Chat</Link>
      {children}
    </div>
  )
};

Messages.propTypes = {
  children: React.PropTypes.node
};

export default Messages;
