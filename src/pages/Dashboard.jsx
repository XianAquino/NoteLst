import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskForm from '../components/TaskForm';
import Task from '../components/Tasks';

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

  render() {
    const { userInfo } = this.props;
    if(userInfo.id) {
      return(
        <div>
          <p>Dashboard</p>
          <p> {userInfo.name}</p>
          <div className='task-container'>
            <button onClick={() => (this.toggleTaskForm(true))}>Create Task</button>
            <Task userId={userInfo.id}/>
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
  userInfo: React.PropTypes.object,
};

const mapStateToProps = (state) => ({userInfo: state.userInfo});

export default connect(mapStateToProps)(Dashboard);
