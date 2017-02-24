import React, { Component } from 'react';
import User from '../components/User';
import getContacts from '../util/getContacts';
import { connect } from 'react-redux';

class Contacts extends Component {

  componentWillMount() {
    getContacts('testme', (users) => {
      console.log(users);
    });
  }

  render() {
    return(
      <ul>
        {
        }
      </ul>
    );
  }
};

Contacts.propTypes = {
  users: React.PropTypes.array,
  sender: React.PropTypes.string,
  username: React.PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    username: state.userInfo.username
  };
};

export default connect(mapStateToProps)(Contacts);
