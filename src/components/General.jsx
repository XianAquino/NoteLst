import React, {Component, PropTypes} from 'react';
import userRequests from '../util/userRequests';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userInfoActions';
import {Paper, Divider, TextField, RaisedButton} from 'material-ui';

const muiStyle = {
  saveBtn: {
    margin: '14px',
    float: 'right'
  },
  container: {
    overflow: 'hidden'
  }
};

class General extends Component {
  constructor(props) {
    super(props);
    const {name, email} = this.props;
    this.state = {
      name,
      email
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    this.setState({[target.name]: target.value});
  }

  saveChanges () {
    const {id, actions, email, name} = this.props;
    const newInfo = {
      email: this.state.email || email,
      name: this.state.name || name
    }
    userRequests.update(id, newInfo);
    actions.updateUserInfo(newInfo);
  }

  render() {
    const {id, username, name, email} = this.props;
    if (id) {
      return(
        <div className='general-settings col-xs-12 col-sm-8 col-md-8 col-lg-8'>
          <Paper style={muiStyle.container}>
            <p>Username: <span>{username}</span></p>
            <Divider/>
            <TextField
              onChange={this.handleInputChange}
              name='name'
              type='text'
              defaultValue={name}
              floatingLabelText='name'
            />
            <br/>
            <TextField
              onChange={this.handleInputChange}
              name='email'
              type='email'
              defaultValue={email}
              floatingLabelText='email'
            />
            <br/>
            <RaisedButton
              onTouchTap={this.saveChanges}
              backgroundColor='#175057'
              labelColor='#FFF'
              label='Save Changes'
              style={muiStyle.saveBtn}
            />
          </Paper>
        </div>
      );
    }
    return null;
  }
};

General.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  actions: PropTypes.object
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch)
});

export default connect(null, mapDispatchToProps)(General);
