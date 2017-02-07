import React, { Component } from 'react';
import login from '../util/login.js';

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
    login(this.state);
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
          <label>Password:</label>
          <input
            name='pwd'
            type='password'
            onChange={this.handleInputChange}
          />
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

export default Login;
