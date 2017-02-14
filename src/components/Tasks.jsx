import React, { Component } from 'react';
import getTasks from '../util/getTasks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions.jsx';

class Tasks extends Component {
  componentWillMount() {
    const { userId, actions } = this.props;
    getTasks(this.props.userId, (response) => {
      console.log(response);
      actions.loadTasks(response.data);
    });
  }

  render() {
    const { tasks } = this.props;
    return(
      <div>
        <h2>Todos</h2>
        <ul>
          {
            tasks.map((task, i) =>
              <li key={i}>
                <div>
                  <p>{task.title}</p>
                  <p>{task.todo}</p>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
};

Tasks.propTypes = {
  userId: React.PropTypes.number
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
