import React, { Component }from 'react';
import { browserHistory } from 'react-router';
import crypto from 'crypto';

class UserSearchResult extends Component {

  constructor(props) {
    super(props);
    this.startConversation = this.startConversation.bind(this);
  }

  createSha1Id(string) {
    return (crypto.createHash('sha1').update(string).digest('hex'));
  }

  startConversation() {
    const { username , sender} = this.props;
    // to generate a unique key for each conversation
    // compare username and sender and hash it using sha1
    let conversationId;
    if(username < sender) {
      conversationId = this.createSha1Id(username+sender);
    } else {
      conversationId = this.createSha1Id(sender+username);
    }
    browserHistory.push(`/messages/${conversationId}`);
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
