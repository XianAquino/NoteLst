import React, { Component, PropTypes } from 'react';
import GroupNotes from '../containers/GroupNotes';
import groupRequest from '../util/groupRequest';

class GroupPage extends Component {

  componentWillMount() {
    const { groupId } = this.props.params
    groupRequest.getGroup(groupId, (info) => {
      console.log("group", info);
    });
  }

  render() {
    const { groupId } = this.props.params
    return(
      <div className='container-fluid'>
        <div className='row'>
          <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
          </aside>
          <div>
            <GroupNotes groupId={groupId}/>
          </div>
        </div>
      </div>
    )
  }
}

GroupPage.proptypes = {
  params: PropTypes.object
};

export default GroupPage;
