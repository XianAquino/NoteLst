import React, { PropTypes } from 'react';
import CreateGroup from '../components/CreateGroup';
import Groups from '../components/Groups';
import { connect } from 'react-redux';

const GroupsPage = ({userId}) => {
  if (userId) {
    return(
      <div className='container-fluid'>
        <div className='row'>
          <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
            <CreateGroup/>
          </aside>
          <Groups userId={userId}/>
        </div>
      </div>
    )
  }
  return null;
};

GroupsPage.propTypes = {
  userId: PropTypes.number
};

const mapStateToProps = (state) => ({
  userId: state.userInfo.id
});

export default connect(mapStateToProps)(GroupsPage);
