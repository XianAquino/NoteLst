import React, { Component }from 'react';
import { browserHistory } from 'react-router';
import createConversationId from '../util/createConversationId';

class User extends Component {

  constructor(props) {
    super(props);
    this.startConversation = this.startConversation.bind(this);
  }

  startConversation() {
    const { username , sender} = this.props;
    createConversationId(username, sender, (conversationId) => {
      browserHistory.push(`/messages/${conversationId}`);
    });
  }

  render() {
    return(
      <li onClick={this.startConversation}>{this.props.name}</li>
    )
  }
};

User.propTypes = {
  username: React.PropTypes.string,
  sender: React.PropTypes.string,
  name: React.PropTypes.string,
}

export default User;
