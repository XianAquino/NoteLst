import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import logout from '../util/logout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import * as socketActions from '../actions/socketActions';
import { MenuItem } from 'material-ui/Menu';

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
      <MenuItem
        primaryText='Sign out'
        onTouchTap={this.logout}
        rightIcon={<i className="material-icons">power_settings_new</i>}
      />
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(loginActions, socketActions), dispatch)
  };
};


export default connect(null,mapDispatchToProps)(LogoutButton);
