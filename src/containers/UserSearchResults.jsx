import React from 'react';
import User from '../components/User';
import List from 'material-ui/List';
import { Divider, Subheader } from 'material-ui';


const UserSearchResults = ({users, sender, search, clearResult}) => {
  if (!users.length) {
    return(
      <Subheader>No Match Found</Subheader>
    )
  }

  return(
    <List>
      <Subheader>Search results</Subheader>
      <Divider/>
      {
        users.map((user, i) =>
          <User
            search={true}
            clearResult={clearResult}
            key={i}
            username={user.username}
            image={user.image}
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
  sender: React.PropTypes.string,
  clearResult: React.PropTypes.func,
  search: React.PropTypes.bool
};

export default UserSearchResults;
