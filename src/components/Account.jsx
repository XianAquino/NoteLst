import React, {Component, PropTypes} from 'react';
import userRequests from '../util/userRequests';
import {Divider, Paper, TextField, RaisedButton} from 'material-ui';
import {orange500, blue500} from 'material-ui/styles/colors';

const muiStyle = {
  container: {
    margin: '15px',
    textAlign: 'center',
    overflow: 'hidden'
  },
  hintText: {
    color: '#008A7D',
  },
  button: {
    margin: '14px 14px 14px 0'
  }
};

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPwd: '',
      newPwd: '',
      confirmationPwd: '',
      showPassword: false,
      message: ''
    };
    this.displayPwd = this.displayPwd.bind(this);
    this.changePwd = this.changePwd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({[target.name]: target.value});
  }

  displayPwd() {
    this.setState({showPassword: !this.state.showPassword});
  }

  getPasswords() {
    const {oldPwd, newPwd} = this.state;
    return {
      oldPwd,
      newPwd,
      username: this.props.username
    };
  }

  displaySuccess() {
    this.setState({
      oldPwd: '',
      newPwd: '',
      confirmationPwd: '',
      message: 'Password changed successfully'
    });
  }

  displayIncorrectPwd() {
    this.setState({
      message: 'incorrect old password'
    });
  }

  displayPwdDontMatch() {
    this.setState({
      message: 'new password don\'t match'
    });
  }

  changePwd() {
    const {newPwd, confirmationPwd} = this.state;
    if(newPwd === confirmationPwd) {
      userRequests.changePwd(this.props.id, this.getPasswords(), (response) => {
        if (response === 'incorrect') {
          this.displayIncorrectPwd();
        } else if (response === 'success') {
          this.displaySuccess();
        }
      });
    }else{
      this.displayPwdDontMatch();
    }
  }

  render() {
    const {oldPwd, newPwd, confirmationPwd, showPassword, message} = this.state;
    const inputType = showPassword ? 'text' : 'password';
    const pwdBtnText = showPassword ? 'Hide Password' : 'Show Password';
    const warningMessage = message ? <span className='warning-msg'>{message}</span> : null;
    return(
      <div className='password-setting'>
        <h1>Change Password</h1>
        <Divider/>
        <Paper style={muiStyle.container}>
          <TextField
            type='password'
            name='oldPwd'
            hintText='Enter old password'
            floatingLabelText='Old Password'
            onChange={this.handleInputChange}
            floatingLabelStyle={muiStyle.hintText}
          />
          <br/>
          <TextField
            type={inputType}
            name='newPwd'
            hintText='Enter new password'
            floatingLabelText='New Password'
            onChange={this.handleInputChange}
            floatingLabelStyle={muiStyle.hintText}
          />
          <br/>
          <TextField
            type={inputType}
            name='confirmationPwd'
            hintText='confirm new password'
            floatingLabelText='Confirm new password'
            onChange={this.handleInputChange}
            floatingLabelStyle={muiStyle.hintText}
          />
          <br/>
          {warningMessage}
          <div className='pwd-btns'>
            <RaisedButton
              label={pwdBtnText}
              onTouchTap={this.displayPwd}
              backgroundColor='#FFF'
              labelColor='#455A64'
              style={muiStyle.button}
            />
            <RaisedButton
              label='change'
              onTouchTap={this.changePwd}
              backgroundColor='#008A7D'
              labelColor='#FFF'
              style={muiStyle.button}
            />
          </div>
        </Paper>
      </div>
    );
  }
};

Account.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string
};

export default Account;
