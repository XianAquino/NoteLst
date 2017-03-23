import React, { Component, PropTypes } from 'react';

class Group extends Component {
  render() {
    const { id, name, dateCreated, noOfMembers, userId,
      createdBy, creatorId, dateJoined } = this.props;

    if (userId === creatorId) {
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
        <button>Delete</button>
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
  dateJoined: PropTypes.string
};

export default Group;
