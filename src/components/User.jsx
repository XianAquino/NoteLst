import React, { Component }from 'react';
import { browserHistory } from 'react-router';
import createConversationId from '../util/createConversationId';
import * as currentConversationActions from '../actions/currentConversationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class User extends Component {

  constructor(props) {
    super(props);
    this.startConversation = this.startConversation.bind(this);
  }

  startConversation() {
    const { username , sender, change, socket, currentConversationID, actions } = this.props;

    createConversationId(username, sender, (conversationId) => {
      socket.emit('leaveConversation', currentConversationID);
      actions.changeConversationID(conversationId);
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
  socket: React.PropTypes.object,
  currentConversationID: React.PropTypes.string,
  actions: React.PropTypes.object
};

const mapStateToProps = (state) => ({
  socket: state.socket,
  currentConversationID: state.currentConversationID
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(currentConversationActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
