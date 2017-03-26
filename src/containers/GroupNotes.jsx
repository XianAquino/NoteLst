import React, { PropTypes } from 'react';

const GroupNotes = ({groupId}) => {
  return (
    <div>{groupId}</div>
  )
}

GroupNotes.proptypes={
  groupId: PropTypes.number
};

export default GroupNotes;
