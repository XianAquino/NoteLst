import React, { PropTypes } from 'react';

const SearchedNote = ({noteId, title}) => {
  return(<li>{title}</li>);
};

SearchedNote.propTypes = {
  noteId: PropTypes.number,
  title: PropTypes.string
};

export default SearchedNote;
