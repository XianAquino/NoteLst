import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import logout from '../util/logout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';

class LogoutButton extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    logout(response => {
      this.props.actions.updateLoginStatus(response.data);
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
    actions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(null,mapDispatchToProps)(LogoutButton);
