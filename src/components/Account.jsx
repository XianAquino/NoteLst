import React, {Component, PropTypes} from 'react';
import userRequests from '../util/userRequests';

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
    const warningMessage = message ? <span>{message}</span> : null;
    return(
      <div>
        <h2>Change Password</h2>
        <input
          type='password'
          name='oldPwd'
          placeholder='enter old password'
          defaultValue={oldPwd}
          onChange={this.handleInputChange}
        /><br/>
        <input
          type={inputType}
          name='newPwd'
          placeholder='enter new password'
          defaultValue={newPwd}
          onChange={this.handleInputChange}
        /><br/>
        <input
          type={inputType}
          name='confirmationPwd'
          placeholder='confirm new password'
          defaultValue={confirmationPwd}
          onChange={this.handleInputChange}
        /><br/>
        {warningMessage}
        <button onClick={this.displayPwd}>{pwdBtnText}</button>
        <button onClick={this.changePwd}>Change</button>
      </div>
    );
  }
};

Account.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string
};

export default Account;
