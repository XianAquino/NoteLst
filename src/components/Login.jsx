import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions.jsx';
import { Paper, TextField, RaisedButton, CircularProgress } from 'material-ui';

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
    event.preventDefault();
    this.props.actions.login(this.state);
  }

  displayUserError() {
    const { error } = this.props.login;
    return error === `username don't exist`
      ? <span className='warning-msg'>{error}</span> : null
  }

  displayPasswordError() {
    const { error } = this.props.login;
    return error === 'incorrect password'
      ? <span className='warning-msg'>{error}</span> : null
  }

  displayLoading() {
    return this.props.login.loading ? <CircularProgress />
      : <RaisedButton onTouchTap={this.handleSubmit}
          backgroundColor='#008A7D'
          label='Sign in'
          labelColor='#FFF'
          style={muiStyle.button}
        />
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
        { this.displayUserError() }
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
        { this.displayPasswordError() }
        <br/>
        { this.displayLoading() }
      </div>
    );
  }
};

Login.propTypes = {
  login: React.PropTypes.object,
  actions: React.PropTypes.object
}

const mapStateToProps = (state) => ({ login: state.login });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
