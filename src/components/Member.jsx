import React, { PropTypes } from 'react';

const Member = ({id, username, name}) => {
  return(
    <div>
      <p>{name}</p>
    </div>
  )
};

Member.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  name: PropTypes.string
};

export default Member;
