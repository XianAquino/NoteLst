import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import userRequests from '../util/userRequests';
import General from '../components/General';
import Account from '../components/Account';
import Avatar from '../components/Avatar';

const Settings = ({user}) => {
  const {id, username, image, name, email} = user;
  return (
    <div className='settings'>
      <Avatar
        id={id}
        image={image}
      />
      <General
        id={id}
        username={username}
        name={name}
        email={email}
      />
      <hr/>
      <Account
        id={id}
        username={username}
      />
    </div>
  );
};

Settings.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.userInfo
});

export default connect(mapStateToProps)(Settings);
