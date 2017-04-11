import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import * as socketActions from '../actions/socketActions.jsx';
import * as userInfoActions from '../actions/userInfoActions.jsx';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

import checkAuth from '../util/checkAuth';
import userRequests from '../util/userRequests';
import Navbar from '../components/Navbar';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#175057',
    primary2Color: '#175057',
    pickerHeaderColor: '#008A7D',
  }
});

class Layout extends Component {

  componentWillMount() {
    const {actions} = this.props;
    checkAuth((isAuthenticated) => {
      if (isAuthenticated) {
        userRequests.getInfo((info) => {
          actions.updateUserInfo(info);
          actions.initializeSocket();
        })
      } else {
        browserHistory.push('/auth/login');
      }
    });
  }

  render() {
    const { children, socket, userInfo } = this.props;
    //check if the user is logged in and connected to socketServer
    if(socket && userInfo.id) {
      return(
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Navbar/>
            {children}
          </div>
        </MuiThemeProvider>
      );
    }
    return null;
  }
};

Layout.propTypes = {
  actions: PropTypes.object,
  userInfo: PropTypes.object,
  socket: PropTypes.object,
  children: PropTypes.node
}

const mapStateToProps = (state) => ({
  socket: state.socket,
  userInfo: state.userInfo
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...socketActions, ...userInfoActions}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
