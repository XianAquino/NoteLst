import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as loginActions from '../actions/loginActions.jsx';
import * as socketActions from '../actions/socketActions.jsx';
import * as messagesActions from '../actions/messagesActions.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import checkAuth from '../util/checkAuth';
import Navbar from '../components/Navbar';

class Layout extends Component {
  componentWillMount() {
    const { isLoggedIn, actions } = this.props;
    if( isLoggedIn === undefined ) {
      checkAuth((isAuthenticated) => {
        actions.updateLoginStatus({isLoggedIn: isAuthenticated})
        if (!isAuthenticated) {
          browserHistory.push('/login');
        } else {
          actions.initializeSocket();
        }
      })
    } else if ( isLoggedIn === false) {
      browserHistory.push('/login');
    } else {
      actions.initializeSocket();
    }
  }

  render() {
    const { children, isLoggedIn, socket } = this.props;
    //check if the user is logged in and connected to socketServer
    if(isLoggedIn, socket) {
      return(
        <div>
          <Navbar/>
          {children}
        </div>
      );
    }
    return null;
  }
};

Layout.propTypes = {
  isLoggedIn: React.PropTypes.bool,
  actions: React.PropTypes.object,
  children: React.PropTypes.node
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn,
  socket: state.socket
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    Object.assign(loginActions, socketActions, messagesActions),
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
