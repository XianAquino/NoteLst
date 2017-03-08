import React from 'react';
import * as d3 from 'd3';

const ProgressMeter = () => {
  const width = 300,
      height = 300,
      fullCircle = 2 * Math.PI,
      progress = 80/100 * fullCircle;

  const arc = d3.arc()
    .startAngle(0)
    .innerRadius(90)
    .outerRadius(120)
    .endAngle(progress)

  return(
    <div className='progress-meter'>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          <g className='meter'>
            <path
              className='path-bg'
              d={arc()}
            />
            <text textAnchor='middle' dy='0.35em' fontSize='4em'>80%</text>
          </g>
        </g>
      </svg>
    </div>
  )
};

export default ProgressMeter;
