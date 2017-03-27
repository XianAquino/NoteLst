import React, { Component, PropTypes } from 'react';
import Posts from '../containers/Posts';
import Members from '../components/Members';
import groupRequest from '../util/groupRequest';
import * as currentGroupActions from '../actions/currentGroupActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class GroupPage extends Component {

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

  render() {
    const { groupId, currentGroup, currentGroupMembers, params } = this.props;
    const { id, name, no_of_members, adminId, admin, adminUserName } = currentGroup;
    return(
      <div className='container-fluid'>
        <div className='row'>
          <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
            <Members
              noOfMembers={no_of_members}
              adminId={adminId}
              admin={admin}
              adminUserName={adminUserName}
              members={currentGroupMembers}
            />
          </aside>
          <div>
            <div className='current-group-bar'>
              <p>{name}</p>
            </div>
            <Posts groupId={params.groupId}/>
          </div>
        </div>
      </div>
    )
  }
}

GroupPage.proptypes = {
  params: PropTypes.object,
  actions: PropTypes.object,
  currentGroup: PropTypes.object,
  currentGroupMembers: PropTypes.array
};

const mapStateToProps = (state) => ({
  currentGroup: state.currentGroup,
  currentGroupMembers: state.currentGroupMembers
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(currentGroupActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
