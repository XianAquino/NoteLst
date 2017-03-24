import React, { PropTypes } from 'react';

const GroupPage = ({params}) => {
  return(
    <div>
      {params.groupId}
    </div>
  )
}

GroupPage.proptypes = {
  params: PropTypes.object
};

export default GroupPage;
