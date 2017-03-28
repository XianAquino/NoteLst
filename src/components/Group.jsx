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

  newGroup() {
    const { id, name, dateCreated, createdBy, noOfMembers, creatorId} = this.props;
    return {
      id,
      name,
      creator: creatorId,
      date: dateCreated,
      date_joined: new Date().toISOString(),
      creator_name: createdBy,
      no_of_members: noOfMembers + 1
    };
  }

  newMember() {
    const { id, name, username }  = this.props.user;
    return {
      userId: id,
      name,
      username
    };
  }

  joinGroup() {
    const { id, actions, socket } = this.props;
    socket.emit('newMember', id, this.newMember());
    actions.addGroup(this.newGroup());
    actions.removeSearchedGroup(id);
  }

  render() {
    const { id, name, dateCreated, noOfMembers, user,
      createdBy, creatorId, dateJoined, nonMember } = this.props;
    if (user.id !== creatorId) {
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
  user: PropTypes.object,
  dateJoined: PropTypes.string,
  actions: PropTypes.object,
  nonMember: PropTypes.bool,
  socket: PropTypes.object
};

const mapStateToProps = (state) => ({
  socket: state.socket
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign(groupActions, searchedGroupsActions), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Group);
