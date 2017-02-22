import React from 'react';
import UserSearchResult from '../components/UserSearchResult';

const UserSearchResults = ({users, sender}) => {
  return(
    <ul>
      {
        users.map((user, i) =>
          <UserSearchResult
            key={i}
            username={user.username}
            name={user.name}
            sender={sender}
          />
        )
      }
    </ul>
  );
};

UserSearchResults.propTypes = {
  users: React.PropTypes.array,
  sender: React.PropTypes.string
};

export default UserSearchResults;
