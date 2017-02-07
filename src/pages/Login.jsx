import React, { Component } from 'react';
import login from '../util/login.js';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions.jsx';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:'',
      pwd:''
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
        this.props.actions.updateLoginStatus({isLoggedIn: true});
        browserHistory.push('/');
      }
    });
    event.preventDefault();
  }

  render () {
    return(
      <div className='login'>
        <h1>Login</h1>
        <form>
          <label>Username:</label>
          <input
            name='username'
            type='text'
            onChange={this.handleInputChange}
          />
          {
            this.props.login.userExist ? null : <span>username doesn't exist</span>
          }
          <br />
          <label>Password:</label>
          <input
            name='pwd'
            type='password'
            onChange={this.handleInputChange}
          />
          {
            this.props.login.passwordMatch ? null : <span>password didn't match</span>
          }
          <input
            type='submit'
            value='Login'
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({login: state.login});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
