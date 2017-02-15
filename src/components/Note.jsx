import React from 'react';
import { Link } from 'react-router';

const Note = ({ title, id }) => {
  return(
    <div>
      <li>
        <Link to={`/notes/${id}`}>{title}</Link>
      </li>
    </div>
  )
};

Note.propTypes = {
  title: React.PropTypes.string,
  id: React.PropTypes.number
}

export default Note;
