import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createTask from '../util/createTask';
import * as taskActions from '../actions/taskActions.jsx';
import { DatePicker, TimePicker, TextField, RaisedButton } from 'material-ui';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import AddIcon from 'material-ui/svg-icons/content/add-box';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      time: null,
      title: '',
      todo: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
    this.handleTimePicker = this.handleTimePicker.bind(this);
  }

  handleDatePicker(event, value) {
    this.setState({date: value});
  }

  handleTimePicker(event, value) {
    this.setState({time: value});
  }

  handleInputChange(event) {
    const target = event.target
    this.setState({ [target.name]: target.value })
    event.preventDefault();
  }

  formatDateAndTime() {
    const { date, time } = this.state;
    return {
      date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userId, actions } = this.props;
    const params = Object.assign({}, this.state, this.formatDateAndTime());
    createTask(userId, params, (task) => {
      const taskId = task.data.insertId;
      actions.addTask(Object.assign(this.state, {id: taskId}));
    })
    this.props.toggleTaskForm(false);
  }

  render() {
    const { time, date, title, todo} = this.state;
    return(
      <div>
        <h2>Create Task</h2>
        <label>Date</label>
        <DatePicker hintText='Enter Date'
          name='date' onChange={this.handleDatePicker}
          value={date}/>
        <label>Time</label>
        <TimePicker hintText='Enter Time'
          format='ampm'
          onChange={this.handleTimePicker}
          value={time}/>
        <TextField
          name='title'
          floatingLabelText='Task'
          hintText='Enter Task'
          onChange={this.handleInputChange}
          value={title}/><br/>
        <TextField
          name='todo'
          floatingLabelText='Description'
          hintText='Enter Description'
          multiLine={true}
          rows={4}
          onChange={this.handleInputChange}
          value={todo}
        />
        <br/>
        <RaisedButton onClick={this.handleSubmit}
          label='Create Task' icon={<AddIcon/>}
        />
        <RaisedButton onClick={() => (this.props.toggleTaskForm(false))}
          label='Cancel' icon={<UndoIcon/>} />
      </div>
    )
  }
};

TaskForm.propTypes = {
  userId: React.PropTypes.number,
  toggleTaskForm: React.PropTypes.func
}

const mapStateToProps = (state) => ({userId: state.userInfo.id});

const mapDispatchToProps = (dispatch) => {
  return { actions : bindActionCreators(taskActions, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
