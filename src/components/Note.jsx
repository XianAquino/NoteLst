import React from 'react';
import { Link } from 'react-router';

const Note = ({ title, id, remove }) => {
  return(
    <div>
      <li>
        <Link to={`/notes/${id}`}>{title}</Link>
        <button onClick={() => { remove(id) }}>X</button>
      </li>
    </div>
  )
};

Note.propTypes = {
  title: React.PropTypes.string,
  id: React.PropTypes.number,
  remove: React.PropTypes.func
}

export default Note;
