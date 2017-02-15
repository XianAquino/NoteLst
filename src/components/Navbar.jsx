import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';

const Navbar = ({userInfo}) => {
  return(
    <div className='navbar'>
      <p>Home</p>
      <Link to='/'>Home</Link>
      <Link to='/messages'>messages</Link>
      <Link to={`${userInfo.username}/notes`}>notes</Link>
      <Link to='/groups'>groups</Link>
      <p>{userInfo.name}</p>
      <LogoutButton/>
    </div>
  );
};

Navbar.propTypes = {
  userInfo: React.PropTypes.object
};

const mapStateToProps = (state) => ({ userInfo: state.userInfo });

export default connect(mapStateToProps)(Navbar);
