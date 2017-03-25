import React, { PropTypes } from 'react';
import Group from '../components/Group';

const SearchGroups = ({groups, userId}) => {
  if (!groups.length) {
    return (
      <p>no match found</p>
    )
  }
  return(
    <div className='groups'>
      <ul>
        {
          groups.map((group, i) =>
            <Group
              key={i}
              id={group.group_id}
              userId={userId}
              name={group.name}
              dateCreated={group.date}
              noOfMembers={group.no_of_members}
              createdBy={group.creator_name}
              creatorId={group.creator}
            />
          )
        }
      </ul>
  </div>
  )
};

SearchGroups.propTypes = {
  groups: PropTypes.array,
  userId: PropTypes.number
}

export default SearchGroups;
