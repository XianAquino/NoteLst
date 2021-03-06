import React, { Component, createFactory } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messagesActions from '../actions/messagesActions';
import * as socketActions from '../actions/socketActions';
import getMessages from '../util/getMessages';
import getParticipants from '../util/getParticipants';
import { Paper, Divider, RaisedButton, TextField, Avatar } from 'material-ui';
import Messages from '../containers/Messages';

const style = {
  messageField: {
    width: '100%',
    margin: '5% 1% 1% 1%'
  },
  sendBtn: {
    color: '#FFF'
  }
};

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      contact: null,
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
    getParticipants(params.messageId, (participants) => {
      const contact = this.props.username === participants.user1 ?
        participants.user2 : participants.user1
      this.setState({contact});
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

  componentDidUpdate() {
    const overflowScrollElement = document.getElementsByClassName('messages');
    overflowScrollElement[0].scrollTop = overflowScrollElement[0].scrollHeight;
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
    const { contact, message } = this.state;
    return(
      <div>
        <Paper className='conversation' rounded={false}>
          <Avatar
            src='http://res.cloudinary.com/de7lidb1d/image/upload/c_crop,w_443/v1488676774/users/style_icons_product_human_best_do1.png'
            size={45}
            style={{margin: '2px'}}
          /><span className='contact-name'>{contact}</span>
          <Divider/>
          <Messages
            messages={messages}
            userId={userId}
          />
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
                  value={message}
                  style={style.messageField}
                />
              </div>
              <div className='send-btn col-md-2 col-lg-2'>
                <RaisedButton
                  backgroundColor='#008A7D'
                  labelPosition="before"
                  icon={<i className="material-icons">send</i>}
                  labelColor='#FFF'
                  style={style.sendBtn}
                  label='Send'
                  onClick={this.handleSubmit}
                />
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
  username: state.userInfo.username,
  socket: state.socket,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign(messagesActions, socketActions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
