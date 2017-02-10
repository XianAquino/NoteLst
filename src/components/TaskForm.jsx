import React, { Component } from 'react';
import { connect } from 'react-redux';
import createTask from '../util/createTask';


class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: '',
      title: '',
      todo: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target
    this.setState({ [target.name]: target.value })
    event.preventDefault();
  }
  handleSubmit(event) {
    createTask(this.props.userId, this.state);
    event.preventDefault();
    this.props.toggleTaskForm(false);
  }

  render() {
    return(
      <div>
        <h2>Taskform</h2>
        <form>
          <label>Date</label>
          <input onChange={this.handleInputChange} name='date' type='date'/><br/>
          <label>Time</label>
          <input onChange={this.handleInputChange} name='time' type='time'/><br/>
          <label>Task</label>
          <input onChange={this.handleInputChange} name='title' type='text'/><br/>
          <label>Description</label>
          <textarea onChange={this.handleInputChange} name='todo'></textarea><br/>
          <input onClick={this.handleSubmit} type='submit' value='Create Task' />
        </form>
        <button onClick={() => (this.props.toggleTaskForm(false))}>cancel</button>
      </div>
    )
  }
};

TaskForm.propTypes = {
  userId: React.PropTypes.number,
  toggleTaskForm: React.PropTypes.func
}

const mapStateToProps = (state) => ({userId: state.userInfo.id});

export default connect(mapStateToProps)(TaskForm);