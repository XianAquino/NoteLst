import React, { Component, createFactory } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messagesActions from '../actions/messagesActions';
import * as socketActions from '../actions/socketActions';
import getMessages from '../util/getMessages';
import { Paper, Divider, RaisedButton, TextField } from 'material-ui';
import Message from './Message';

const messageField = {
  width: '100%',
  margin: '5% 1% 1% 1%'
}


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
    const { userId, messages } = this.props;
    return(
      <div>
        <Paper className='conversation' zDepth={2} rounded={false}>
          <p>{this.props.params.messageId}</p>
          <Divider/>
          <div className='messages'>
            <ul>
            {
              messages.map((content, i) =>
                <Message
                  key={i}
                  message={content.message}
                  sender={content.sender}
                  date={content.created_at}
                  userId={userId}
                />
              )
            }
            </ul>
          </div>
          <Divider/>
          <div className='send-message container-fluid'>
            <div className='row'>
              <div className='col-md-10 col-lg-10'>
                <TextField
                  hintText='Enter Message'
                  floatingLabelText='Message'
                  multiLine={true}
                  rows={2}
                  rowsMax={2}
                  onChange={this.handleInput}
                  name='message'
                  value={this.state.message}
                  style={messageField}
                />
              </div>
              <div className='send-btn col-md-2 col-lg-2'>
                <RaisedButton
                  backgroundColor='#3F51B5'
                  onClick={this.handleSubmit}
                >Send
                </RaisedButton>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
};

Conversation.propTypes = {
  params: React.PropTypes.object,
  socket: React.PropTypes.object,
  messages: React.PropTypes.array,
  userId: React.PropTypes.number,
};

const mapStateToProps = (state) => ({
  userId: state.userInfo.id,
  socket: state.socket,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign(messagesActions, socketActions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
