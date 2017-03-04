import React, { Component, createFactory } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messagesActions from '../actions/messagesActions';
import * as socketActions from '../actions/socketActions';
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
    const { socketConnected, params, messages, socket, actions } = props;
    socket.emit('startConversation', params.messageId);
    getMessages(params.messageId, (messages) => {
      actions.loadMessages(messages);
    });
    actions.setSocketConnection();
    socket.on('receiveMessage', (message) => {
      actions.addMessage(message);
    });
  }

  componentWillMount() {
    this.initializeConversation(this.props);
  }

  componentWillUnmount() {
    delete this.props.socket.json._callbacks.$receiveMessage
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.messageId !== nextProps.params.messageId) {
      delete this.props.socket.json._callbacks.$receiveMessage
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
  userId: React.PropTypes.number,
  socketConnected: React.PropTypes.bool
};

const mapStateToProps = (state) => ({
  userId: state.userInfo.id,
  username: state.userInfo.username,
  socket: state.socket,
  messages: state.messages,
  socketConnected: state.socketConnected
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign(messagesActions, socketActions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
