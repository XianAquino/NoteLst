import React, { Component, createFactory } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messagesActions from '../actions/messagesActions';
import getMessages from '../util/getMessages';
import {RouteHandler} from 'react-router';

const handler = createFactory(RouteHandler);

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  initializeConversation(props) {
    const { params, socket, actions } = props;
    socket.emit('startConversation', params.messageId);
    getMessages(params.messageId, (messages) => {
      actions.loadMessages(messages);
    });
  }

  componentWillMount() {
    this.initializeConversation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.messageId !== nextProps.params.messageId) {
      this.initializeConversation(nextProps);
    }
  }

  handleInput(event) {
    this.setState({message: event.target.value})
  }

  handleSubmit(event) {
    const { socket, params, userId } = this.props;
    const message = {
      conversation_id: params.messageId,
      sender: userId,
      message: this.state.message
    };
    event.preventDefault();
    if(this.state.message) {
      socket.emit('sendMessage', params.messageId, message);
    }
    this.setState({message: ''})
  }

  render() {
    return(
      <div>
        <p>{this.props.params.messageId}</p>
        <ul>
        {
          this.props.messages.map((context, i) =>
            <li key={i}>{context.message}</li>
          )
        }
        </ul>
        <p>Message</p>
        <input
          onChange={this.handleInput}
          name='message'
          placeholder='Enter Message'
          value={this.state.message}
        />
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    )
  }
};

Conversation.propTypes = {
  params: React.PropTypes.object,
  socket: React.PropTypes.object,
  messages: React.PropTypes.array,
  userId: React.PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    userId: state.userInfo.id,
    socket: state.socket,
    messages: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(messagesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
