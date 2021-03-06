import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createTask from '../util/createTask';
import * as taskActions from '../actions/taskActions.jsx';
import * as tasksByWeekActions from '../actions/tasksByWeekActions';
import { DatePicker, TimePicker, TextField, RaisedButton, Paper } from 'material-ui';
import format from '../util/formatDateTime';
import '../css/taskform.css';

const style = {
  button: {
    margin: '5px 12px 10px',
    width: '44%',
    color: '#FFF'
  }
};

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
      date: format.toDate(date),
      time: format.toTime(time)
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userId, actions, selectedDate } = this.props;
    const params = Object.assign({}, this.state, this.formatDateAndTime());
    createTask(userId, params, (task) => {
      const taskId = task.data.insertId;
      if(params.date === format.toDate(selectedDate))
        actions.addTask(Object.assign(this.state, {id: taskId}));
    })
    actions.addTaskByWeek(this.state.date);
    this.props.toggleTaskForm(false);
  }

  render() {
    const { time, date, title, todo} = this.state;
    return(
      <div className='task-form-container'>
        <Paper className='task-form'>
          <h2>Create Task</h2>
          <DatePicker hintText='Enter Date'
            name='date' onChange={this.handleDatePicker}
            value={date}/>
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
              rowsMax={4}
              onChange={this.handleInputChange}
              value={todo}
            />
          <br/>
          <RaisedButton onClick={this.handleSubmit}
            backgroundColor='#008A7D'
            label='Create'
            labelColor='#FFF'
            icon={<i className="material-icons">add_box</i>}
            style={style.button}
          />
          <RaisedButton
            backgroundColor='#C62828'
            onClick={() => (this.props.toggleTaskForm(false))}
            labelColor='#FFF'
            label='Cancel'
            icon={<i className="material-icons">undo</i>}
            style={style.button}
          />
        </Paper>
      </div>
    )
  }
};

TaskForm.propTypes = {
  userId: React.PropTypes.number,
  toggleTaskForm: React.PropTypes.func,
  selectedDate: React.PropTypes.instanceOf(Date)
}

const mapStateToProps = (state) => ({userId: state.userInfo.id});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(Object.assign(taskActions, tasksByWeekActions), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
