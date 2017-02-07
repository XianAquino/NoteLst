import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Dashboard extends Component {
  componentWillMount() {
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
  isLoggedIn: React.PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn
  }
}

export default connect(mapStateToProps)(Dashboard);
