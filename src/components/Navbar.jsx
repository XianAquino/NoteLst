import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';
import AppBar from 'material-ui/AppBar'
import { browserHistory } from 'react-router';
import AvNote from 'material-ui/svg-icons/av/note';
import MessageIcon from 'material-ui/svg-icons/communication/mail-outline';
import GroupsIcon from 'material-ui/svg-icons/social/group';
import { Tabs, Tab } from 'material-ui/Tabs';

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
        <i className="material-icons">message</i>
        <span>Message</span>
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
