import React, { Component, PropTypes } from 'react';
import signUp from '../util/signUp.js';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as signUpActions from '../actions/signUpActions.jsx';
import { TextField, RaisedButton } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const muiStyle = {
  input: {
    width: '300px',
  },
  inputPwd:{
    width: '270px'
  },
  button: {
    margin: '25px 0',
    width: '300px',
    color: '#FFF'
  },
  icon: {
    verticalAlign: 'middle',
    color: '#175057',
    fontSize: '2.2em',
    width: '30px'
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
    this.showPasswordText = this.showPasswordText.bind(this);
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

  showPasswordText() {
    this.props.actions.showPassword(!this.props.signUp.showPassword);
  }

  inputFieldsEmtpy() {
    const {username, pwd, confirmPwd, email} = this.state;
    return !Boolean(username && pwd && confirmPwd && email);
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
    const {passwordMatch, usernameAvailable, showPassword} = this.props.signUp;
    const pwdMatchWarning = passwordMatch ? <br/> : <span className='warning-msg'>Passwords don't match</span> ;
    const usernameWarning = usernameAvailable ? <br/> : <span className='warning-msg'>Username is not available</span> ;
    const pwdInputType = showPassword ? 'text' : 'password';
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
          type={pwdInputType}
          onChange={this.handleInputChange}
          hintText='Enter password'
          floatingLabelText='Password'
          style={muiStyle.inputPwd}
        /><i
          className='material-icons'
          style={muiStyle.icon}
          onClick={this.showPasswordText}
          >pageview</i><br/>
        <TextField
          name='confirmPwd'
          type={pwdInputType}
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
          disabled={this.inputFieldsEmtpy() || !passwordMatch}
        />
      </div>
    );
  }
};

SignUp.propTypes = {
  signUp: PropTypes.object,
  action: PropTypes.object
}

const mapStateToProps = (state) => ({
  signUp: state.signUp
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(signUpActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
