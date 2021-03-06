import React, { Component }from 'react';
import { browserHistory } from 'react-router';
import createConversationId from '../util/createConversationId';
import * as currentConversationActions from '../actions/currentConversationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class User extends Component {

  constructor(props) {
    super(props);
    this.startConversation = this.startConversation.bind(this);
  }

  startConversation() {
    const { username, sender, change, socket, currentConversationID,
      actions, search, clearResult } = this.props;

    if(search) clearResult();

    createConversationId(username, sender, (conversationId) => {
      socket.emit('leaveConversation', currentConversationID);
      actions.changeConversationID(conversationId);
      browserHistory.push(`/messages/${conversationId}`);
    });
  }

  render() {
    const defaultAvatar='http://res.cloudinary.com/de7lidb1d/image/upload/c_crop,w_443/v1488676774/users/style_icons_product_human_best_do1.png';
    const {name, image} = this.props;
    return(
      <ListItem
        primaryText={name}
        leftAvatar={
          <Avatar
            src={image || defaultAvatar}
          />
        }
        onClick={this.startConversation}
      />
    )
  }
};

User.propTypes = {
  username: React.PropTypes.string,
  sender: React.PropTypes.string,
  name: React.PropTypes.string,
  socket: React.PropTypes.object,
  currentConversationID: React.PropTypes.string,
  actions: React.PropTypes.object,
  clearResult: React.PropTypes.func,
  search: React.PropTypes.bool,
  image: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  socket: state.socket,
  currentConversationID: state.currentConversationID
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(currentConversationActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
