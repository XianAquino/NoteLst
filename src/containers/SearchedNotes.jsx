import React, { PropTypes } from 'react';
import { List, Subheader } from 'material-ui';
import SearchedNote from '../components/SearchedNote';

const SearchedNotes = ({notes}) => {
  if (!notes.length) {
    return (<Subheader>No Match Found</Subheader>)
  }
  return (
    <div className='search-list'>
      <Subheader>Search Result:</Subheader>
      <List>
        {
          notes.map((note, i) =>
            <SearchedNote
              key={i}
              noteId={note.id}
              title={note.title}
            />
          )
        }
      </List>
    </div>
  )
};

SearchedNotes.propTypes = {
  notes: PropTypes.array
}

export default SearchedNotes;
