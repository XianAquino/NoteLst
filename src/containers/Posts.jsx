import React, { Component, PropTypes } from 'react';
import groupRequest from '../util/groupRequest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from '../actions/postsActions';
import Post from '../components/Post';

class Posts extends Component {

  constructor(props){
    super(props);
    this.like = this.like.bind(this);
  }

  componentWillMount() {
    const { groupId, actions, socket } = this.props;
    socket.emit('enterGroup', groupId);
    groupRequest.getPosts(groupId, (posts) => {
      actions.loadPosts(posts);
    });
    socket.on('receiveNote', (post) => {
      actions.addPost(post);
    })
    socket.on('updatePostLikes', (postId, currentLikes) => {
      actions.updatePost(postId, {likes: currentLikes});
    })
  }

  componentWillUnmount() {
    delete this.props.socket.json._callbacks.$receiveNote;
    delete this.props.socket.json._callbacks.$updatePostLikes;
  }

  like(postId, currentLikes) {
    const { socket, groupId,userId } = this.props;
    socket.emit('likePost', groupId, postId, userId, currentLikes);
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
                like={this.like}
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
  posts: PropTypes.array,
  userId: PropTypes.number
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  socket: state.socket,
  userId: state.userInfo.id
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(postsActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
