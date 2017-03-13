import React, { Component } from 'react';
import { connect } from 'react-redux';
import getTasks from '../util/getTasks';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions.jsx';

import TaskForm from '../components/TaskForm';
import Task from '../components/Tasks';
import { RaisedButton, DatePicker } from 'material-ui';
import ProgressMeter from '../components/ProgressMeter';
import TaskChart from '../components/TaskChart';

import '../css/dashboard.css';

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

  componentDidUpdate(prevProps, prevState) {
    //only get tasks if the date was changed or during initial load
    if(prevState.date !== this.state.date || this.state.date === this.currDate){
      const { userInfo, actions } = this.props;
      getTasks(userInfo.id, this.state.date, (response) => {
        actions.loadTasks(response);
      });
    }
  }

  toggleTaskForm(toggle) {
    this.setState({showForm: toggle});
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
              <TaskChart/>
            </aside>
            <div className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>
              <div className='task-container container-fluid'>
                <div className='row task-options'>
                  <label>Date</label>
                  <DatePicker
                    id='task-date-picker'
                    value={this.state.date}
                    style={{float: 'left'}}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className='row'>
                  <div className='task-header'>
                    <h2>Tasks
                      <span>
                        <i className='material-icons'
                          onClick={() => (this.toggleTaskForm(true))}
                        >note_add</i>
                      </span>
                    </h2>
                  </div>
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
              currDate={this.currDate}
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
