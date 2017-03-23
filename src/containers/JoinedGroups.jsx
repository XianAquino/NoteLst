import React, { PropTypes } from 'react';
import Group from '../components/Group';

const JoinedGroups = ({groups, userId}) => {
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
              dateJoined={group.date_joined}
            />
          )
        }
      </ul>
    </div>
  )
};

JoinedGroups.propTypes = {
  groups: PropTypes.array,
  userId: PropTypes.number
};

export default JoinedGroups;
