import React, { Component, PropTypes } from 'react';
import { AppBar, Tabs, Tab, TextField } from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { browserHistory } from 'react-router';
import '../css/auth.css';

const authTheme = getMuiTheme({
  palette: {
    primary1Color: '#008A7D',
    pickerHeaderColor: '#008A7D',
    primary2Color:'008A7D',
    accent1Color: '#175057'
  }
});

const loginAppBarStyle = {
  backgroundColor:'#175057'
};

class Auth extends Component {

  constructor(props) {
    super(props);
    const initialIndex = window.location.pathname.slice(6) === 'signup' ? 1 : 0 ;
    this.state = {
      tabIndex: initialIndex
    };
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  signIn () {
    browserHistory.push('/auth/login');
  }

  signUp () {
    browserHistory.push('/auth/signup');
  }

  render() {
    const {children} = this.props;
    return (
      <MuiThemeProvider muiTheme={authTheme}>
      <div>
        <AppBar
          style={loginAppBarStyle}
          iconClassNameLeft='none'
          zDepth={0}
        />
        <Tabs initialSelectedIndex={this.state.tabIndex}>
          <Tab
            label='Sign In'
            icon={<i className="material-icons">person</i>}
            onActive={this.signIn}
          >
          {children}
          </Tab>
          <Tab
            label='Sign Up'
            icon={<i className="material-icons">person_add</i>}
            onActive={this.signUp}
          >
          {children}
          </Tab>
        </Tabs>
      </div>
      </MuiThemeProvider>
    )
  }
};

export default Auth;
