import React, { Component } from 'react';
import signUp from '../util/signUp.js';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions.jsx';
import * as signUpActions from '../actions/signUpActions.jsx';
import * as userInfoActions from '../actions/userInfoActions.jsx';
import { TextField, RaisedButton } from 'material-ui';

const muiStyle = {
  input: {
    width: '300px',
  },
  button: {
    margin: '25px 0',
    width: '300px',
    color: '#FFF'
  }
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      pwd:'',
      confirmPwd: '',
      email:'',
      name:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  passwordsOnKeyDown(inputField) {
    // return true when a user types in the confirm password field
    // or if he types in the password field and confirm password field is not empty
    return (inputField === 'confirmPwd' || (inputField === 'pwd' && this.state.confirmPwd))
  }

  handleInputChange (event) {
    const target = event.target;
    const {checkPassword} = this.props.actions;
    this.setState({[target.name]: target.value}, () => {
      const {pwd, confirmPwd} = this.state;
      if(this.passwordsOnKeyDown(target.name)) checkPassword(pwd, confirmPwd);
    });
  }

  getSignUpInfo() {
    const {username, pwd, email, name} = this.state;
    return {
      username,
      pwd,
      email,
      name
    }
  }

  handleSubmit (event) {
    const {usernameValidity} = this.props.actions
    signUp(this.getSignUpInfo(), (response) => {
      if(response.data === 'existing username') {
        usernameValidity(false);
      } else if (response.data === 'success') {
        browserHistory.push('/');
      }
    });
    event.preventDefault();
  }

  render () {
    const {signUp} = this.props;
    const pwdMatchWarning = signUp.passwordMatch ? <br/> : <span className='warning-msg'>Passwords don't match</span> ;
    const usernameWarning = signUp.usernameAvailable ? <br/> : <span className='warning-msg'>Username is not available</span> ;
    return(
      <div className='signup-form'>
        <h2>Sign Up</h2>
        <TextField
          name='username'
          type='text'
          onChange={this.handleInputChange}
          hintText='Enter username'
          floatingLabelText='Username'
          style={muiStyle.input}
        />{usernameWarning}
        <TextField
          name='pwd'
          type='password'
          onChange={this.handleInputChange}
          hintText='Enter password'
          floatingLabelText='Password'
          style={muiStyle.input}
        /><br/>
        <TextField
          name='confirmPwd'
          type='password'
          onChange={this.handleInputChange}
          hintText='Enter password'
          floatingLabelText='Password'
          style={muiStyle.input}
        />{pwdMatchWarning}
        <TextField
          name='email'
          type='text'
          onChange={this.handleInputChange}
          hintText='Enter email'
          floatingLabelText='Email'
          style={muiStyle.input}
        /><br/>
        <TextField
          name='name'
          type='text'
          onChange={this.handleInputChange}
          hintText='Enter name'
          floatingLabelText='Name'
          style={muiStyle.input}
        /><br/>
        <RaisedButton
          label='Sign Up'
          backgroundColor='#008A7D'
          labelColor='#FFF'
          style={muiStyle.button}
          onTouchTap={this.handleSubmit}
          disabled={!signUp.passwordMatch}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  login: state.login,
  signUp: state.signUp
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...signUpActions, ...loginActions, ...userInfoActions}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
