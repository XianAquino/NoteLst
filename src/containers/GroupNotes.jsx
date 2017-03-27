import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from '../actions/postsActions';

class GroupNotes extends Component {

  componentWillMount() {
    const { groupId, actions } = this.props;
    groupRequest.getPosts(groupId, (posts) => {
      actions.loadPosts(posts);
    });
  }

  render() {
    console.log("render posts", this.props.posts);
    return (
      <div>{this.props.groupId}</div>
    )
  }
}

GroupNotes.proptypes = {
  groupId: PropTypes.number,
  actions: PropTypes.object,
  posts: PropTypes.array
};

const mapStateToProps = (state) => ({
  posts: state.posts
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(postsActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupNotes);
