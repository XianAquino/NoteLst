import React, { Component } from 'react';
import { Link } from 'react-router';
import UserSearch from '../components/UserSearch';

class Messages extends Component {

  render() {
    return(
      <div>
        <UserSearch/>
        <Link to='/messages/123'>Chat</Link>
        {this.props.children}
      </div>
    )
  }
};

export default Messages;
