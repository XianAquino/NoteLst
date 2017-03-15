import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions.jsx';
import * as tasksByWeekActions from '../actions/tasksByWeekActions';
import deleteTask from '../util/deleteTask';
import updateTask from '../util/updateTask';

import Task from './Task';

class Tasks extends Component {
  constructor(props){
    super(props);
    this.remove = this.remove.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  remove(task) {
    const { actions } = this.props;
    const { id, status, date } = task
    deleteTask(id);
    actions.deleteTask(id);
    actions.updateTaskByWeek(status, date, true);
  }

  updateTask(task, date) {
    const { actions } = this.props;
    updateTask(task);
    let status = task.finish ? 'finish' : 'unfinish';
    actions.updateTask(task)
    actions.updateTaskByWeek(status, date);
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
              date={task.date}
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
  actions: React.PropTypes.object,
};

const mapStateToProps = (state) => ({tasks: state.tasks});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign(taskActions, tasksByWeekActions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
