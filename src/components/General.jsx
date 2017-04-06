import React, {Component, PropTypes} from 'react';
import userRequests from '../util/userRequests';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userInfoActions';

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
    const {id, actions} = this.props;
    const newInfo = this.state;
    userRequests.update(id, newInfo);
    actions.updateUserInfo(newInfo);
  }

  render() {
    const {id, username, name, email} = this.props;
    if (id) {
      return(
        <div className='col-xs-12 col-sm-8 col-md-8 col-lg-8'>
          <p>{username}</p>
          <input
            onChange={this.handleInputChange}
            name='name' type='text'
            defaultValue={name}
          /><br/>
          <input
            onChange={this.handleInputChange}
            name='email' type='email'
            defaultValue={email}
          />
          <button onClick={this.saveChanges}>Save Changes</button>
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
