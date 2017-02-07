import React, { Component } from 'react';
import signUp from '../util/signUp.js';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      pwd:'',
      email:'',
      gender:''
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
    signUp(this.state);
    event.preventDefault();
  }
  render () {
    return(
      <div className='SignUp'>
        <h1>Sign Up</h1>
        <form>
          <label>Username:</label>
          <input name='username' type='text' onChange={this.handleInputChange}/>
          <label>Password:</label>
          <input name='pwd' type='text' onChange={this.handleInputChange}/>
          <label>Email:</label>
          <input name='email' type='text' onChange={this.handleInputChange}/>
          <label>Name:</label>
          <input name='name' type='text' onChange={this.handleInputChange}/>
          <label>Gender:</label>
          <input name='text' name='gender' onChange={this.handleInputChange}/>
          <input type='submit' value='SignUp' onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }
};

export default SignUp;
