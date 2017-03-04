import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';
import AppBar from 'material-ui/AppBar'
import { browserHistory } from 'react-router';

const onClickTitle = () => {
  browserHistory.push('/');
};

const Navbar = ({userInfo}) => {
  return(
    <AppBar
      className='navbar'
      title='NoteLst'
      onTitleTouchTap={onClickTitle}>
      <Link to='/messages'>
        <i className="material-icons">mail</i>
        <span>Messages</span>
      </Link>
      <Link to={`/${userInfo.username}/notes`}>
        <i className="material-icons">note</i>
        <span>Notes</span>
      </Link>
      <Link to='/groups'>
        <i className="material-icons">group</i>
        <span>Groups</span>
      </Link>
      <LogoutButton/>
    </AppBar>
  );
};

Navbar.propTypes = {
  userInfo: React.PropTypes.object
};

const mapStateToProps = (state) => ({ userInfo: state.userInfo });

export default connect(mapStateToProps)(Navbar);
