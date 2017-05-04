import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import * as userInfoActions from '../actions/userInfoActions.jsx';

import Navbar from '../components/Navbar';
import Loading from './Loading';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#175057',
    primary2Color: '#175057',
    pickerHeaderColor: '#008A7D',
    accent1Color: '#008A7D'
  }
});

class Layout extends Component {

  componentWillMount() {
    this.props.actions.loadUser();
  }

  initialLoad() {
    const { children, socket, userInfo } = this.props;
    if (userInfo.initialStateLoading) {
      return <Loading />
    } else {
      // to prevent loading other data
      if (userInfo.success) {
        return (
          <div>
            <Navbar/>
            {children}
          </div>
        );
      } else {
        return null
      }
    }
  }

  render() {
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        { this.initialLoad() }
      </MuiThemeProvider>
    );
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
  actions: bindActionCreators(userInfoActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
