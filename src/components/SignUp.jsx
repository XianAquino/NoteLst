import React, { Component } from 'react';
import signUp from '../util/signUp.js';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions.jsx';
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
      email:'',
      name:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange (event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }
  handleSubmit (event) {
    signUp(this.state, (response) => {
      const user = response.data;
      const userInfo = {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      };
      this.props.actions.updateLoginStatus({isLoggedIn: true});
      this.props.actions.updateUserInfo(userInfo);
      browserHistory.push('/');
    });
    event.preventDefault();
  }
  render () {
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
        /><br/>
        <TextField
          name='pwd'
          type='password'
          onChange={this.handleInputChange}
          hintText='Enter password'
          floatingLabelText='Password'
          style={muiStyle.input}
        /><br/>
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
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({login: state.login});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, loginActions, userInfoActions),
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
