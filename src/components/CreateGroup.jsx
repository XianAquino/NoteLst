import React, { Component, PropTypes } from 'react';
import { TextField, RaisedButton, Divider } from 'material-ui';
import groupRequest from '../util/groupRequest.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as groupActions from '../actions/groupActions';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    const name = event.target.value;
    this.setState({name});
  }

  handleSubmit(event) {
    const { userId, userName, actions } = this.props;
    const params = {
      name: this.state.name,
      userId
    }
    groupRequest.createGroup(params, (response) => {
      const newGroup = {
        group_id: response.groupId,
        name: params.name,
        creator: userId,
        date: new Date().toISOString(),
        creator_name: userName,
        no_of_members: 1
      }
      actions.addGroup(newGroup);
      this.setState({name: ''});
    });
  }

  render() {
    return(
      <div>
        <h2>Create Groups</h2>
        <Divider/>
        <TextField
          hintText={'Enter Name'}
          floatingLabelText={'Name'}
          onChange={this.handleInput}
          value={this.state.name}
        />
        <br/>
        <RaisedButton
          backgroundColor='#3F51B5'
          labelColor='#FFF'
          label='Create Group'
          icon={<i className="material-icons">group_add</i>}
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

CreateGroup.propTypes = {
  userId: PropTypes.number,
  userName: PropTypes.string
};

const mapStateToProps = (state) => ({
  userId: state.userInfo.id,
  userName: state.userInfo.name
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
