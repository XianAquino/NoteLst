import React, { Component } from 'react';
import login from '../util/login.js';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions.jsx';
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
  }

  handleInputChange (event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit (event) {
    const {checkCorrectPwd, userExist} = this.props.actions;
    login(this.state, (response) => {
      console.log(response)
      if (response.data === 'incorrect username') {
        userExist(false)
      } else if(response.data === 'incorrect password') {
        checkCorrectPwd(false)
      } else {
        browserHistory.push('/')
      }
    });
    event.preventDefault();
  }

  render () {
    return(
      <div className='signin-form'>
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

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
