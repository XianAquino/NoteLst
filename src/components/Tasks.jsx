import React, { Component } from 'react';
import getTasks from '../util/getTasks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions.jsx';
import deleteTask from '../util/deleteTask';
import Task from './Task';

class Tasks extends Component {
  constructor(props){
    super(props);
    this.remove = this.remove.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }
  componentWillMount() {
    const { userId, actions } = this.props;
    getTasks(this.props.userId, (response) => {
      actions.loadTasks(response);
    });
  }

  remove(taskId) {
    const { actions } = this.props;
    deleteTask(taskId);
    actions.deleteTask(taskId);
  }

  updateTask(task) {
    const { actions } = this.props;
    actions.updateTask(task)
  }

  render() {
    const { tasks } = this.props;
    return(
      <div className='tasks'>
        {
          tasks.map((task, i) =>
            <Task
              key={i}
              remove={this.remove}
              id={task.id}
              title={task.title}
              desc={task.todo}
              finish={task.finish}
              updateTask={this.updateTask}
            />
          )
        }
      </div>
    )
  }
};

Tasks.propTypes = {
  userId: React.PropTypes.number,
  actions: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(taskActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
