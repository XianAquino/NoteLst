import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';
import * as groupActions from '../actions/groupActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Group extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove() {
    const { id, actions } = this.props;
    groupRequest.deleteGroup(id);
    actions.deleteGroup(id);
  }

  render() {
    const { id, name, dateCreated, noOfMembers, userId,
      createdBy, creatorId, dateJoined } = this.props;

    if (userId !== creatorId) {
      return(
        <li>
          <p>Group {name}</p>
          <p>Created By: {createdBy} on<span>{dateCreated}</span></p>
          <p>No. of members: {noOfMembers}</p>
          <p>Joined: {dateJoined}</p>
          <button>Enter</button>
        </li>
      )
    }
    return(
      <li>
        <p>Group {name}</p>
        <p>Created on:<span>{dateCreated}</span></p>
        <p>No. of members: {noOfMembers}</p>
        <button onClick={this.remove}>Delete</button>
        <button>Enter</button>
      </li>
    )
  }
}

Group.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  dateCreated: PropTypes.string,
  noOfMembers: PropTypes.number,
  createdBy: PropTypes.string,
  creatorId: PropTypes.number,
  userId: PropTypes.number,
  dateJoined: PropTypes.string,
  actions: PropTypes.object
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Group);
