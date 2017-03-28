import React, { Component, PropTypes } from 'react';
import Posts from '../containers/Posts';
import Members from '../components/Members';
import groupRequest from '../util/groupRequest';
import * as currentGroupActions from '../actions/currentGroupActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMember: ''
    }
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount() {
    const { params, actions } = this.props
    const { getGroup, getMembers } = groupRequest;
    getGroup(params.groupId, (info) => {
      actions.loadGroupInfo(info);
      getMembers(params.groupId, (members) => {
        actions.loadGroupMembers(members);
      })
    });
  }

  handleInput(event) {
    this.setState({searchMember: event.target.value});
  }

  render() {
    const { groupId, currentGroup, currentGroupMembers, params, userId } = this.props;
    const { id, name, no_of_members, adminId, admin, adminUserName } = currentGroup;
    const target = this.state.searchMember.toLowerCase();
    const members = !target ? currentGroupMembers
      : currentGroupMembers.filter( member => member.name.toLowerCase().includes(target));
    if (userId) {
      return(
        <div className='container-fluid'>
          <div className='row'>
            <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
              <input
                type='text'
                onChange={this.handleInput}
                placeholder='Enter member name'
              />
              <Members
                noOfMembers={no_of_members}
                adminId={adminId}
                admin={admin}
                adminUserName={adminUserName}
                members={members}
              />
            </aside>
            <div>
              <div className='current-group-bar'>
                <p>{name}</p>
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
  userId: PropTypes.number
};

const mapStateToProps = (state) => ({
  currentGroup: state.currentGroup,
  currentGroupMembers: state.currentGroupMembers,
  userId: state.userInfo.id
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(currentGroupActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
