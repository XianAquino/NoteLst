import React, { PropTypes } from 'react';
import Member from '../components/Member';
import { Divider, List } from 'material-ui'

const Members = ({username, members, adminId, admin, adminUserName, adminAvatar}) => {
  return(
    <div>
      <div className='group-members group-admin'>
        <h2>Admin:</h2>
        <Divider/>
        <List>
          <Member
            id={adminId}
            memberName={admin}
            memberUsername={adminUserName}
            username={username}
            avatar={adminAvatar}
          />
        </List>
      </div>
      <div className='group-members'>
        <h2>Members:</h2>
        <Divider/>
        <List>
        {
          members.map((member,i) =>
          <Member
            key={i}
            id={member.userId}
            memberName={member.name}
            memberUsername={member.username}
            username={username}
            avatar={member.image}
          />
          )
        }
        </List>
      </div>

    </div>
  )
};

Member.proptypes = {
  members: PropTypes.array,
  adminId: PropTypes.number,
  admin: PropTypes.string,
  adminUserName: PropTypes.string,
  adminAvatar: PropTypes.string,
  username: PropTypes.string
}

export default Members;
