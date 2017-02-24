import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import logout from '../util/logout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import * as socketActions from '../actions/socketActions';

class LogoutButton extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { actions } = this.props;
    logout(response => {
      actions.updateLoginStatus(response.data);
      actions.removeSocket();
      browserHistory.push('/login');
    });
  }

  render() {
    return(
      <button onClick={this.logout}>Logout</button>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(loginActions, socketActions), dispatch)
  };
};


export default connect(null,mapDispatchToProps)(LogoutButton);
