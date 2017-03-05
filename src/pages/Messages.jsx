import React from 'react';
import { Link } from 'react-router';
import UserSearch from '../components/UserSearch';
import '../css/message.css';

const Messages = ({children}) => {
  return(
    <div className='container-fluid'>
      <div className='row'>
        <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
          <UserSearch />
        </aside>
        <div className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>
          {children}
        </div>
      </div>
    </div>
  )
};

Messages.propTypes = {
  children: React.PropTypes.node
};

export default Messages;
