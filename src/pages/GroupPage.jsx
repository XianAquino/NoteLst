import React, { Component, PropTypes } from 'react';
import Posts from '../containers/Posts';
import Members from '../components/Members';
import groupRequest from '../util/groupRequest';
import * as currentGroupActions from '../actions/currentGroupActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../css/currentGroup.css';

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMember: ''
    }
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount() {
    const { params, actions, socket } = this.props;
    const { getGroup, getMembers } = groupRequest;
    const { groupId } = params;
    getGroup(groupId, (info) => {
      actions.loadGroupInfo(info);
      getMembers(groupId, (members) => {
        actions.loadGroupMembers(members);
      })
    });
    socket.emit('enterGroup', groupId);
    socket.on('addNewMember', (groupId, user) => {
      actions.addNewMember(user);
    });
  }

  componentWillUnmount() {
    delete this.props.socket.json._callbacks.$addNewMember;
  }

  handleInput(event) {
    this.setState({searchMember: event.target.value});
  }

  render() {
    const { groupId, currentGroup, currentGroupMembers, params, userId, username } = this.props;
    const { id, name, no_of_members, adminId, admin, adminUserName, adminAvatar } = currentGroup;
    const target = this.state.searchMember.toLowerCase();
    const members = !target ? currentGroupMembers
      : currentGroupMembers.filter( member => member.name.toLowerCase().includes(target));
    if (userId) {
      return(
        <div className='container-fluid'>
          <div className='row'>
            <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
              <div className='search-container'>
                <div className='search-field'>
                  <i className="material-icons">search</i>
                  <input
                    placeholder='Search member'
                    onChange={this.handleInput}
                  />
                </div>
              </div>
              <Members
                adminId={adminId}
                admin={admin}
                adminUserName={adminUserName}
                adminAvatar={adminAvatar}
                members={members}
                username={username}
              />
            </aside>
            <div className='main-container current-group-scroll col-xs-12 col-sm-12 col-md-9 col-lg-9'>
              <div className='current-group-header'>
                <h1>{name}</h1>
                <p>No of Members: <span>{no_of_members}</span></p>
              </div>
              <Posts
                userId={userId}
                groupId={params.groupId}
              />
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

GroupPage.proptypes = {
  params: PropTypes.object,
  actions: PropTypes.object,
  currentGroup: PropTypes.object,
  currentGroupMembers: PropTypes.array,
  userId: PropTypes.number,
  username: PropTypes.string,
  socket: PropTypes.object
};

const mapStateToProps = (state) => ({
  currentGroup: state.currentGroup,
  currentGroupMembers: state.currentGroupMembers,
  userId: state.userInfo.id,
  username: state.userInfo.username,
  socket: state.socket
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(currentGroupActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
