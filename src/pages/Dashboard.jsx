import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Dashboard extends Component {
  componentWillMount() {
    console.log(this.props.userInfo);
    if (!this.props.isLoggedIn) {
      browserHistory.push('/login');
    }
  }

  render() {
    return(
      <p>Dashboard</p>
    );
  }
};

Dashboard.propTypes = {
  isLoggedIn: React.PropTypes.bool,
  userInfo: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(Dashboard);
