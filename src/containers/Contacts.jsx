import React, { Component } from 'react';
import User from '../components/User';
import getContacts from '../util/getContacts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contactsActions from '../actions/contactsActions';
import Contact from '../components/User';

class Contacts extends Component {

  updateContacts() {
    const { username, actions } = this.props;
    getContacts(username, (users) => {
      actions.loadContacts(users);
    });
  }

  componentWillMount() {
    const { socket } = this.props;
    this.updateContacts();
    socket.on('updateContacts', () => {
      this.updateContacts();
    })
  }

  render() {
    const { contacts, username } = this.props;
    return(
      <div>
      {
        contacts.map((user, i) =>
          <Contact
            key={i}
            username={user.username}
            name={user.name}
            sender={username}
          />
        )
      }
      </div>
    );
  }
};

Contacts.propTypes = {
  sender: React.PropTypes.string,
  username: React.PropTypes.string,
  actions: React.PropTypes.object,
  contacts: React.PropTypes.array
};

const mapStateToProps = (state) => ({
  username: state.userInfo.username,
  contacts: state.contacts,
  socket: state.socket
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(contactsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
