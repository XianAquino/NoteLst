import React from 'react';
import User from '../components/User';
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const UserSearchResults = ({users, sender}) => {
  if (!users.length) {
    return(
      <Subheader>No Match Found</Subheader>
    )
  }

  return(
    <List>
      <Subheader>Search result</Subheader>
      {
        users.map((user, i) =>
          <User
            key={i}
            username={user.username}
            name={user.name}
            sender={sender}
          />
        )
      }
    </List>
  );
};

UserSearchResults.propTypes = {
  users: React.PropTypes.array,
  sender: React.PropTypes.string
};

export default UserSearchResults;
