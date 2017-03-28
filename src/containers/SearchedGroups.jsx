import React, { PropTypes } from 'react';
import Group from '../components/Group';

const SearchGroups = ({groups, user}) => {
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
              user={user}
              name={group.name}
              dateCreated={group.date}
              noOfMembers={group.no_of_members}
              createdBy={group.creator_name}
              creatorId={group.creator}
              nonMember={true}
            />
          )
        }
      </ul>
  </div>
  )
};

SearchGroups.propTypes = {
  groups: PropTypes.array,
  user: PropTypes.object
}

export default SearchGroups;
