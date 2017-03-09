import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';
import { AppBar, Avatar, Popover, Divider } from 'material-ui'
import { Menu, MenuItem } from 'material-ui/Menu';
import { browserHistory } from 'react-router';
import SidebarNavigation from '../components/SidebarNavigation';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom'
      },
      targetOrigin: {
        horizontal: 'right',
        vertical: 'top'
      },
      openDrawer: false
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleNavigationToggle = this.handleNavigationToggle.bind(this);
  }

  onClickMenu (target) {
    if (target === 'settings') {
      browserHistory.push('/settings');
    } else {
      browserHistory.push('/');
    }
    this.setState({
      open: false
    })
  }

  handleNavigationToggle() {
    this.setState({openDrawer: !this.state.openDrawer});
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  render() {
    const { userInfo } = this.props
    return(
      <div>
      <AppBar className='navbar'
        onLeftIconButtonTouchTap={this.handleNavigationToggle}
      >
        <img
          className='title'
          src='/nav-logo.png'
          alt='notelst-logo-nav'
          onClick={()=>(this.onClickMenu())}
        />
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
        <div>
          <Avatar
            src='http://res.cloudinary.com/de7lidb1d/image/upload/c_crop,w_443/v1488676774/users/style_icons_product_human_best_do1.png'
            size={45}
            style={{marginTop: '8px'}}
            onClick={this.handleTouchTap}
          />
          <Popover
            className='pop-over'
            zDepth={2}
            style={{overflow: 'none'}}
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={this.state.anchorOrigin}
            targetOrigin={this.state.targetOrigin}
            onRequestClose={this.handleRequestClose} >
            <Menu>
              <MenuItem
                primaryText={`Signed in as: ${userInfo.username}`}
                disabled={true}
               />
               <Divider />
              <MenuItem
                primaryText='Home'
                rightIcon={<i className='material-icons'>home</i>}
                onTouchTap={()=>(this.onClickMenu())}
              />
              <MenuItem
                primaryText='Settings'
                rightIcon={<i className='material-icons'>settings</i>}
                onTouchTap={()=>(this.onClickMenu('settings'))}
              />
              <LogoutButton/>
            </Menu>
          </Popover>
        </div>
        </AppBar>
        <SidebarNavigation
          openDrawer={this.state.openDrawer}
          handleNavigationToggle={this.handleNavigationToggle}
        />
      </div>
    )
  }
};

Navbar.propTypes = {
  userInfo: React.PropTypes.object
};

const mapStateToProps = (state) => ({ userInfo: state.userInfo });

export default connect(mapStateToProps)(Navbar);
