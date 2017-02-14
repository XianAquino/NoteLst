import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as loginActions from '../actions/loginActions.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import checkAuth from '../util/checkAuth';
import Navbar from '../components/Navbar';

class Layout extends Component {
  componentWillMount() {
    const { isLoggedIn, actions  } = this.props;
    if( isLoggedIn === undefined ) {
      checkAuth((isAuthenticated) => {
        actions.updateLoginStatus({isLoggedIn: isAuthenticated})
        if (!isAuthenticated) {
          browserHistory.push('/login');
        }
      })
    } else if ( isLoggedIn === false) {
      browserHistory.push('/login');
    }
  }

  render() {
    const { children, isLoggedIn } = this.props;
    if(isLoggedIn) {
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

const mapStateToProps = (state) => ({isLoggedIn: state.login.isLoggedIn});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
