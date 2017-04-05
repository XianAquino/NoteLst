import React, { PropTypes } from 'react';
import Member from '../components/Member';

const Members = ({username, members, adminId, admin, adminUserName}) => {
  return(
    <div>
      <div>
        <span>Admin:</span>
        <Member
          id={adminId}
          memberName={admin}
          memberUsername={adminUserName}
          username={username}
        />
      </div>
      <div>
        <span>Members:</span>
        {
          members.map((member,i) =>
          <Member
            key={i}
            id={member.userId}
            memberName={member.name}
            memberUsername={member.username}
            username={username}
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
  username: PropTypes.string
}

export default Members;
