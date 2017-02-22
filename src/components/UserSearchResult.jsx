import React, { Component }from 'react';
import { browserHistory } from 'react-router';
import crypto from 'crypto';

class UserSearchResult extends Component {

  constructor(props) {
    super(props);
    this.startConversation = this.startConversation.bind(this);
  }

  startConversation() {

  }

  render() {
    return(
      <li onClick={this.startConversation}>{this.props.name}</li>
    )
  }
};

UserSearchResult.propTypes = {
  username: React.PropTypes.string,
  sender: React.PropTypes.string,
  name: React.PropTypes.string,
}

export default UserSearchResult;
