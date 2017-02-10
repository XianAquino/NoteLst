import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions.jsx';
import checkAuth from '../util/checkAuth';
import TaskForm from '../components/TaskForm';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
    this.toggleTaskForm = this.toggleTaskForm.bind(this);
  }

  toggleTaskForm(toggle) {
    this.setState({showForm: toggle});
  }

  componentWillMount() {
    const { isLoggedIn, actions  } = this.props;
    if( isLoggedIn === undefined ) {
      checkAuth((isAuthenticated)=>{
        actions.updateLoginStatus({isLoggedIn: isAuthenticated})
        if (!isAuthenticated) {
          browserHistory.push('/login');
        }
      })
    } else if ( isLoggedIn === false) {
      browserHistory.push('/login');
    }
  }

  render() {
    if(this.props.isLoggedIn) {
      return(
        <div>
          <p>Dashboard</p>
          <p> {this.props.userInfo.name}</p>
          <div className='task-container'>
            <button onClick={() => (this.toggleTaskForm(true))}>Create Task</button>
          </div>
          {
            this.state.showForm ? <TaskForm toggleTaskForm={this.toggleTaskForm}/> : null
          }
        </div>
      );
    }
    return null;
  }
};

Dashboard.propTypes = {
  isLoggedIn: React.PropTypes.bool,
  userInfo: React.PropTypes.object,
  actions: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions,dispatch)
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
