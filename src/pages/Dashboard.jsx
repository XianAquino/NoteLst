import React, { Component } from 'react';
import { connect } from 'react-redux';
import getTasks from '../util/getTasks';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions.jsx';

import TaskForm from '../components/TaskForm';
import Task from '../components/Tasks';
import { RaisedButton, DatePicker, Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui';
import ProgressMeter from '../components/ProgressMeter';
import TaskChart from '../components/TaskChart';

import '../css/dashboard.css';

const DateTimeFormat = global.Intl.DateTimeFormat;
const style = {
  toolbar: {
    backgroundColor: '#008A7D',
  },
  toolbarTitle: {
    color: '#FFF'
  },
  toolbarSeparator: {
    backgroundColor: '#FFF'
  },
  date: {
    width:'110px'
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.currDate = new Date();
    this.state = {
      date: this.currDate,
      showForm: false
    }
    this.toggleTaskForm = this.toggleTaskForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.loadTasks();
  }

  componentDidUpdate(prevProps, prevState) {
    //only get tasks if the date was changed or during initial load
    if (prevState.date !== this.state.date || this.state.date === this.currDate) {
      this.loadTasks();
    }
  }

  loadTasks() {
    const { userInfo, actions } = this.props;
    getTasks(userInfo.id, this.state.date, (response) => {
      actions.loadTasks(response);
    });
  }

  toggleTaskForm() {
    this.setState({showForm: !this.state.showForm});
  }

  handleInputChange(event, value) {
    this.setState({date: value});
    console.log(this.state.date);
  }

  render() {
    const { userInfo } = this.props;
    if(userInfo.id) {
      return(
        <div className='container-fluid'>
          <div className='row'>
            <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
              <ProgressMeter/>
              <TaskChart userId = {userInfo.id}/>
            </aside>
            <div className='main-container col-xs-12 col-sm-12 col-md-9 col-lg-9'>
              <div className='task-container container-fluid'>
                <Toolbar style={style.toolbar}>
                  <ToolbarGroup>
                    <ToolbarTitle style={style.toolbarTitle} text='Date'/>
                    <DatePicker
                      style={style.date}
                      id='task-date-picker'
                      value={this.state.date}
                      underlineShow={false}
                      onChange={this.handleInputChange}
                      formatDate={new DateTimeFormat('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }).format}
                    />
                    <ToolbarSeparator style={style.toolbarSeparator}/>
                    <RaisedButton
                      backgroundColor='#175057'
                      labelColor='#FFF'
                      label='Add'
                      onTouchTap={this.toggleTaskForm}
                    />
                  </ToolbarGroup>
                </Toolbar>
                <div className='row'>
                  <Task
                    selectedDate={this.state.date}
                    userId={userInfo.id}
                  />
                </div>
              </div>
            </div>
          </div>
          {
            this.state.showForm
            ? <TaskForm
              selectedDate={this.state.date}
              toggleTaskForm={this.toggleTaskForm}
            /> : null
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

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(taskActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
