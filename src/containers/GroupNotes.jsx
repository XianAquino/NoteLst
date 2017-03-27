import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';

class GroupNotes extends Component {

  componentWillMount() {
    groupRequest.getPosts(this.props.groupId, (posts) => {
      console.log("post", posts);
    })
  }

  render() {
    return (
      <div>{this.props.groupId}</div>
    )
  }
}

GroupNotes.proptypes={
  groupId: PropTypes.number
};

export default GroupNotes;
