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
    this.deletePost = this.deletePost.bind(this);
  }

  componentWillMount() {
    const { groupId, actions, socket, userId } = this.props;
    socket.emit('enterGroup', groupId);
    groupRequest.getPosts(groupId, userId, (posts) => {
      actions.loadPosts(posts);
    });
    socket.on('receiveNote', (post) => {
      actions.addPost(post);
    });
    socket.on('updatePostLikes', (postId, likeStatus) => {
      const {likes, postedBy, liked} = likeStatus;
      let likeUpdate = {likes};
      if (userId === postedBy) likeUpdate.liked = liked;
      actions.updatePost(postId, likeUpdate);
    });
    socket.on('deletedPost', (postId) => {
      actions.deletePost(postId);
    })
  }

  componentWillUnmount() {
    delete this.props.socket.json._callbacks.$receiveNote;
    delete this.props.socket.json._callbacks.$updatePostLikes;
    delete this.props.socket.json._callbacks.$deletedPost;
  }

  like(postId, currentLikes, condition) {
    const { socket, groupId, userId } = this.props;
    socket.emit('likePost', groupId, postId, userId, currentLikes, condition);
  }

  deletePost(postId, noteId) {
    const { socket, groupId } = this.props;
    socket.emit('deletePost', groupId, postId, noteId);
  }

  render() {
    const { posts, userId } = this.props;
    return (
      <div>
        <ul>
          {
            posts.map((post, i) =>
              <Post
                key={i}
                userId={userId}
                id={post.postId}
                noteId={post.note_id}
                likes={post.likes}
                like={this.like}
                liked={post.liked}
                title={post.title}
                userAvatar={post.image}
                postedById={post.postedById}
                postedBy={post.name}
                postedAt={post.time_posted}
                deletePost={this.deletePost}
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
  socket: state.socket
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(postsActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
