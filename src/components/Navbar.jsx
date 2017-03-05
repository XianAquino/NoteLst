import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';
import { AppBar, Avatar } from 'material-ui'
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
      <Avatar
        src='http://res.cloudinary.com/de7lidb1d/image/upload/c_crop,w_443/v1488676774/users/style_icons_product_human_best_do1.png'
        size={45}
        style={{marginTop: '8px'}}
      />
      <LogoutButton/>
    </AppBar>
  );
};

Navbar.propTypes = {
  userInfo: React.PropTypes.object
};

const mapStateToProps = (state) => ({ userInfo: state.userInfo });

export default connect(mapStateToProps)(Navbar);
