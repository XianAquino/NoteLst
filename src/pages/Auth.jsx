import React, { Component, PropTypes } from 'react';
import { AppBar, Tabs, Tab, TextField } from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { browserHistory } from 'react-router';
import '../css/auth.css';

const authTheme = getMuiTheme({
  palette: {
    primary1Color: '#008A7D',
    pickerHeaderColor: '#008A7D',
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
        <div className='auth-container container-fluid'>
          <div className='row'>
            <div className='notelst-description col-md-6 col-lg-6 hidden-xs hidden-sm'>

            </div>
            <div className='auth-tabs col-xs-12 col-sm-12 col-md-6 col-lg-6'>
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
          </div>
        </div>
        <footer>
          test footer
        </footer>
      </div>
      </MuiThemeProvider>
    )
  }
};

export default Auth;
