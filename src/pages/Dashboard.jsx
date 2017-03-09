import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskForm from '../components/TaskForm';
import Task from '../components/Tasks';
import { RaisedButton, DatePicker } from 'material-ui';
import ProgressMeter from '../components/ProgressMeter';
import TaskChart from '../components/TaskChart';

import '../css/dashboard.css';

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
                  <DatePicker id='task-date-picker' style={{float: 'left'}}/>
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
                  <Task userId={userInfo.id}/>
                </div>
              </div>
            </div>
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
