import React, { PropTypes } from 'react';
import SearchedNote from '../components/SearchedNote';

const SearchedNotes = ({notes}) => {
  if (!notes.length) {
    return (<p>no match found</p>)
  }
  return (
    <div>
      <ul>
        {
          notes.map((note, i) =>
            <SearchedNote
              key={i}
              noteId={note.id}
              title={note.title}
            />
          )
        }
      </ul>
    </div>

  )
};

SearchedNotes.propTypes = {
  notes: PropTypes.array
}

export default SearchedNotes;
