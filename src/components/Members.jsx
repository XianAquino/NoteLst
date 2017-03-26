import React, { PropTypes } from 'react';
import Member from '../components/Member';

const Members = ({noOfMembers, members, adminId, admin, adminUserName}) => {
  return(
    <div>
      <div>
        <p>Members: </p><span>{noOfMembers}</span>
      </div>
      <div>
        <span>Admin:</span>
        <Member
          id={adminId}
          name={admin}
          username={adminUserName}
        />
      </div>
      <div>
        <span>Members:</span>
        {
          members.map((member,i) =>
          <Member
            key={i}
            id={member.user_id}
            name={member.name}
            username={member.username}
          />
          )
        }
      </div>

    </div>
  )
};

Member.proptypes = {
  members: PropTypes.array,
  adminId: PropTypes.number,
  admin: PropTypes.string,
  adminUserName: PropTypes.string,
  noOfMembers: PropTypes.number
}

export default Members;
