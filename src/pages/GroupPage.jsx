import React, { Component, PropTypes } from 'react';
import GroupNotes from '../containers/GroupNotes';
import groupRequest from '../util/groupRequest';
import * as currentGroupActions from '../actions/currentGroupActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class GroupPage extends Component {

  componentWillMount() {
    const { params, actions } = this.props
    groupRequest.getGroup(params.groupId, (info) => {
      actions.loadGroupInfo(info);
    });
  }

  render() {
    const { groupId, currentGroup } = this.props;
    return(
      <div className='container-fluid'>
        <div className='row'>
          <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
          </aside>
          <div>
            <div className='current-group-bar'>
              <p>{currentGroup.name}</p>
            </div>
            <GroupNotes groupId={currentGroup.id}/>
          </div>
        </div>
      </div>
    )
  }
}

GroupPage.proptypes = {
  params: PropTypes.object,
  actions: PropTypes.object,
  currentGroup: PropTypes.object
};

const mapStateToProps = (state) => ({
  currentGroup: state.currentGroup
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(currentGroupActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
