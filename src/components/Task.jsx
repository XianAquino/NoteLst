import React from 'react';

const Task = ({id, title, desc, remove}) => {
  return(
    <li>
      <div>
        <p>{title}</p>
        <p>{desc}</p>
        <button onClick={() => (remove(id))}>Delete</button>
      </div>
    </li>
  )
};

Task.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  desc: React.PropTypes.string,
  remove: React.PropTypes.func
}

export default Task;
