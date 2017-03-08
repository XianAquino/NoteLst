import React from 'react';
import { BarChart } from 'react-d3-components';

const TaskChart = () => {

  // sample data set that need to pass later
    var data = [
      {
        label: 'done',
        values: [
          {x: 'Feb 1', y: 10},
          {x: 'Feb 2', y: 4},
          {x: 'Feb 3', y: 3},
          {x: 'Feb 4', y: 10},
          {x: 'Feb 5', y: 4},
          {x: 'Feb 6', y: 2},
          {x: 'Feb 7', y: 1}
        ]
      },
      {
        label: 'fail',
        values: [
          {x: 'Feb 1', y: 6},
          {x: 'Feb 2', y: 8},
          {x: 'Feb 3', y: 5},
          {x: 'Feb 4', y: 10},
          {x: 'Feb 5', y: 4},
          {x: 'Feb 6', y: 2},
          {x: 'Feb 7', y: 1}
        ]
      },
    ];

  return (
    <div className='task-chart'>
      <BarChart
        data={data}
        width={300}
        height={300}
        margin={{top: 10, bottom: 50, left: 0, right: 0}}
      />
    </div>
  )
}

export default TaskChart;
