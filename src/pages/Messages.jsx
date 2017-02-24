import React from 'react';
import { Link } from 'react-router';
import UserSearch from '../components/UserSearch';
import Contacts from '../containers/Contacts';

const Messages = ({children}) => {
  return(
    <div>
      <UserSearch/>
      <Contacts />
      {children}
    </div>
  )
};

Messages.propTypes = {
  children: React.PropTypes.node
};

export default Messages;
