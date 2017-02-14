import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Navbar = ({userInfo}) => {
  return(
    <div className='navbar'>
      <p>Home</p>
      <Link to='/'>Home</Link>
      <Link to='/messages'>messages</Link>
      <Link to='/notes'>notes</Link>
      <Link to='/groups'>groups</Link>
      <p>{userInfo.name}</p>
    </div>
  );
};

Navbar.propTypes = {
  userInfo: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps)(Navbar);
