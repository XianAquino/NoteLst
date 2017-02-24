import React, { Component } from 'react';
import User from '../components/User';
import getContacts from '../util/getContacts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as contactsActions from '../actions/contactsActions';

class Contacts extends Component {

  componentWillMount() {
    const { username, actions } = this.props;
    getContacts(username, (users) => {
      console.log(users);
      actions.loadContacts(users);
    });
  }

  render() {
    const { contacts } = this.props;
    return(
      <ul>
        {
          contacts.map((user, i) =>
          <li>{user.name}</li>
        )
        }
      </ul>
    );
  }
};

Contacts.propTypes = {
  sender: React.PropTypes.string,
  username: React.PropTypes.string,
  actions: React.PropTypes.object,
  contacts: React.PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    username: state.userInfo.username,
    contacts: state.contacts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(contactsActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
