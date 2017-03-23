import React, { Component, PropTypes } from 'react';
import { TextField, RaisedButton, Divider } from 'material-ui';
import groupRequest from '../util/groupRequest.js';
import { connect } from 'react-redux';

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
    event.preventDefault();
    const params = {
      name: this.state.name,
      userId: this.props.userId
    }
    groupRequest.createGroup(params);
    this.setState({name: ''});
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
  userId: PropTypes.number
};

const mapStateToProps = (state) => ({
  userId: state.userInfo.id
});

export default connect(mapStateToProps)(CreateGroup);
