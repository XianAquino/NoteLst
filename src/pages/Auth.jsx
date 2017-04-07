import React, { Component, PropTypes } from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { browserHistory } from 'react-router';
import Description from '../components/Description';
import AuthBar from '../components/AuthBar';
import AuthTabs from '../components/AuthTabs';
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
        <AuthBar/>
        <div className='auth-container container-fluid'>
          <div className='row'>
            <Description/>
            <AuthTabs
              tabIndex={this.state.tabIndex}
              signUp={this.signUp}
              signIn={this.signIn}
              children={children}
            />
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

Auth.propTypes = {
  children: PropTypes.node
};

export default Auth;
