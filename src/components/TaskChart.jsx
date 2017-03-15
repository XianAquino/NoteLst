import React, { Component } from 'react';
import { BarChart } from 'react-d3-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getTasksByWeek from '../util/getTasksByWeek';
import * as tasksByWeekActions from '../actions/tasksByWeekActions';
import * as d3 from 'd3';
const colorScale = d3.scaleOrdinal().range(['#3F51B5', '#B0BEC5']);

class TaskChart extends Component {

  componentWillMount() {
    const { actions, userId } = this.props;
    getTasksByWeek(userId, (tasks) => {
      actions.loadTasksByWeek(tasks)
    })

  }
  render() {
    const { finishTaskByWeek, unfinishTaskByWeek} = this.props.tasks;
    if (finishTaskByWeek) {
      let chartData = [{label: 'finish', values: []},
                       {label: 'unfinish', values: []}];

      for(let date in finishTaskByWeek) {
        chartData[0].values.push({x: date, y: finishTaskByWeek[date]});
        chartData[1].values.push({x: date, y: unfinishTaskByWeek[date]});
      }

      return (
        <div className='task-chart'>
          <h2>Weekly Timeline</h2>
          <BarChart
            colorScale={colorScale}
            data={chartData}
            width={300}
            height={300}
            margin={{top: 10, bottom: 50, left: 0, right: 0}}
          />
        </div>
      )
    }
    return null;
  }
}

TaskChart.propTypes = {
  tasks: React.PropTypes.object,
  actions: React.PropTypes.object
};

const mapStateToProps = (state) => ({tasks: state.tasksByWeek});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(tasksByWeekActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskChart);
