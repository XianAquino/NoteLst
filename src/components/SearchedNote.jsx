import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import { browserHistory } from 'react-router';

const SearchedNote = ({noteId, title}) => {
  return(
    <ListItem
      primaryText={title}
      onClick={()=>( browserHistory.push(`/notes/${noteId}`))}
    />);
};

SearchedNote.propTypes = {
  noteId: PropTypes.number,
  title: PropTypes.string
};

export default SearchedNote;
