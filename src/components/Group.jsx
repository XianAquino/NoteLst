import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';
import * as groupActions from '../actions/groupActions';
import * as searchedGroupsActions from '../actions/searchedGroupsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

class Group extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
    this.enter = this.enter.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
  }

  remove() {
    const { id, actions } = this.props;
    groupRequest.deleteGroup(id);
    actions.deleteGroup(id);
  }
  enter() {
    browserHistory.push(`/groups/${this.props.id}`);
  }

  joinGroup() {
    const { id, name, dateCreated, createdBy, noOfMembers,
            creatorId, actions, userId } = this.props;
    const newGroup = {
      id,
      name,
      creator: creatorId,
      date: dateCreated,
      date_joined: new Date().toISOString(),
      creator_name: createdBy,
      no_of_members: noOfMembers + 1
    }
    groupRequest.joinGroup(id, userId);
    actions.addGroup(newGroup);
    actions.removeSearchedGroup(id);
  }

  render() {
    const { id, name, dateCreated, noOfMembers, userId,
      createdBy, creatorId, dateJoined, nonMember } = this.props;

    if (userId !== creatorId) {
      return(
        <li>
          <p>Group {name}</p>
          <p>Created By: {createdBy} on<span>{dateCreated}</span></p>
          <p>No. of members: {noOfMembers}</p>
          {
            nonMember ? <button onClick={this.joinGroup}>Join</button>
            : <div>
                <p>Joined: {dateJoined}</p>
                <button onClick={this.enter}>Enter</button>
              </div>
          }
        </li>
      )
    }
    return(
      <li>
        <p>Group {name}</p>
        <p>Created on:<span>{dateCreated}</span></p>
        <p>No. of members: {noOfMembers}</p>
        <button onClick={this.remove}>Delete</button>
        <button onClick={this.enter}>Enter</button>
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
  actions: PropTypes.object,
  nonMember: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign(groupActions, searchedGroupsActions), dispatch)
})

export default connect(null, mapDispatchToProps)(Group);
