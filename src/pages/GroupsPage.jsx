import React, { PropTypes } from 'react';
import CreateGroup from '../components/CreateGroup';
import Groups from '../components/Groups';
import { connect } from 'react-redux';

const GroupsPage = ({userInfo}) => {
  if (userInfo.id) {
    return(
      <div className='container-fluid'>
        <div className='row'>
          <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
            <CreateGroup/>
          </aside>
          <Groups user={userInfo}/>
        </div>
      </div>
    )
  }
  return null;
};

GroupsPage.propTypes = {
  userInfo: PropTypes.object
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
});

export default connect(mapStateToProps)(GroupsPage);
