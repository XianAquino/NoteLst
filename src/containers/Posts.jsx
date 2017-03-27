import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from '../actions/postsActions';
import Post from '../components/Post';

class Posts extends Component {

  componentWillMount() {
    const { groupId, actions, socket } = this.props;
    socket.emit('enterGroup', groupId);
    groupRequest.getPosts(groupId, (posts) => {
      actions.loadPosts(posts);
    });
    socket.on('receiveNote', (post) => {
      console.log("recieve post", post);
    })
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        test
        <ul>
          {
            posts.map((post, i) =>
              <Post
                key={i}
                id={post.postId}
                likes={post.likes}
                title={post.title}
                userAvatar={post.image}
                postedBy={post.name}
                postedAt={post.time_posted}
              />
            )
          }
        </ul>
      </div>
    )
  }
}

Posts.proptypes = {
  groupId: PropTypes.number,
  actions: PropTypes.object,
  posts: PropTypes.array
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  socket: state.socket
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(postsActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
