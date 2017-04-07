import React, { Component } from 'react';
import login from '../util/login.js';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions.jsx';
import * as userInfoActions from '../actions/userInfoActions.jsx';
import { Paper, TextField, RaisedButton } from 'material-ui';

const muiStyle = {
  input: {
    width: '300px'
  },
  button: {
    margin: '5px 12px 10px',
    width: '300px',
    color: '#FFF'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:'',
      pwd:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signUpRedirect = this.signUpRedirect.bind(this);
  }
  signUpRedirect() {
    browserHistory.push('/auth/signup');
  }

  handleInputChange (event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }
  handleSubmit (event) {
    login(this.state,(response)=>{
      const userInfo = response.data;
      if (userInfo.userExist === false) {
        this.props.actions.updateLoginStatus({
          userExist: false,
          passwordMatch: true
        });
      } else if (userInfo.passwordMatch === false) {
        this.props.actions.updateLoginStatus({
          passwordMatch: false,
          userExist: true
        });
      } else {
        this.props.actions.updateLoginStatus({
          isLoggedIn: true,
          passwordMatch: true,
          userExist: true,
        });
        this.props.actions.updateUserInfo(userInfo);
        browserHistory.push('/');
      }
    });
    event.preventDefault();
  }

  render () {
    return(
      <div className='login-container'>
        <h2>Sign in</h2>
        <TextField
          hintText='Enter Username'
          floatingLabelText='Username'
          name='username'
          type='text'
          style={muiStyle.input}
          onChange={this.handleInputChange}
        />
        <br/>
        {
          this.props.login.userExist ? null : <span className='warning-msg'>username doesn't exist</span>
        }
        <br/>
        <TextField
          hintText='Enter Password'
          floatingLabelText='password'
          name='pwd'
          type='password'
          style={muiStyle.input}
          onChange={this.handleInputChange}
        />
        <br/>
        {
          this.props.login.passwordMatch ? null : <span className='warning-msg'>password didn't match</span>
        }
        <br/>
        <RaisedButton onTouchTap={this.handleSubmit}
          backgroundColor='#008A7D'
          label='Sign in'
          labelColor='#FFF'
          icon={<i className="material-icons">person</i>}
          style={muiStyle.button}
        />
      </div>
    );
  }
};

Login.propTypes = {
  login: React.PropTypes.object,
  actions: React.PropTypes.object
}

const mapStateToProps = (state) => ({login: state.login});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, loginActions, userInfoActions),
      dispatch
    )
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
