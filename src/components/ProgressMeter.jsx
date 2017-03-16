import React from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

const ProgressMeter = ({tasks}) => {
  if (!tasks.length) {
    return (
      <div className='progress-meter'>
        <h2>No Task created</h2>
      </div>
    )
  }

  const finishedTask = tasks.filter(task => task.finish === 1),
        tasksPercentage = finishedTask.length / tasks.length * 100,
        roundedPercentage = Math.round(tasksPercentage);

  const width = 280,
        height = 280,
        fullCircle = 2 * Math.PI,
        progress = tasksPercentage/100 * fullCircle;

  const arc = d3.arc()
    .startAngle(0)
    .innerRadius(80)
    .outerRadius(110)
    .endAngle(progress)

  return(
    <div className='progress-meter'>
      <h2>Completion Rate</h2>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          <g className='meter'>
            <path
              className='path-bg'
              d={arc()}
            />
            <text textAnchor='middle' dy='0.35em' fontSize='4em'>{`${roundedPercentage}%`}</text>
          </g>
        </g>
      </svg>
    </div>
  )
};

ProgressMeter.propTypes = {
  tasks: React.PropTypes.array
}

const mapStateToProps = (state) => ({tasks: state.tasks});

export default connect(mapStateToProps)(ProgressMeter);
