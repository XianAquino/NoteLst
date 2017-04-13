import React, { Component, PropTypes } from 'react';
import createNote from '../util/createNote';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as notesActions from '../actions/notesActions';
import SearchedNotes from '../containers/SearchedNotes';
import searchNotes from '../util/searchNotes';
import _ from 'underscore';
import { Divider, RaisedButton } from 'material-ui';

const debounceSearch = _.debounce(searchNotes, 500);

const muiStyle = {
  button: {
    margin: '20px auto',
    width: '250px'
  }
};

class NotesSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.create = this.create.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { actions, userId } = this.props;
    this.setState({query: event.target.value}, () => {
      debounceSearch(userId, this.state.query, (notes) => {
        actions.searchNotes(notes);
      });
    });
  }

  create() {
    const { userId, actions } = this.props;
    createNote(userId, (response) => {
      const noteId = response.insertId;
      actions.addNote({id: noteId, title: undefined, note: undefined});
      browserHistory.push(`/notes/${noteId}`);
    });
  }

  render() {
    const {userId, searchedNotes} = this.props;
    const showNotes = this.state.query ? <SearchedNotes notes={searchedNotes}/> : null
    return(
      <div className='notes-sidebar'>
        <div className='search-container'>
          <div className='search-field'>
            <i className="material-icons">search</i>
            <input
              placeholder='Search Notes'
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        {showNotes}
        <Divider/>
        <RaisedButton
          label='Create Note'
          backgroundColor='#175057'
          labelColor='#FFF'
          style={muiStyle.button}
          onTouchTap={this.create}
        />
      </div>
    );
  }
}

NotesSideBar.propTypes = {
  searchNotes: PropTypes.array,
  userId: PropTypes.number,
  actions: PropTypes.object
};

const mapStateToProps = (state) => ({
    searchedNotes: state.searchedNotes
});

const mapDispatchToProps = (dispatch) =>  ({
    actions: bindActionCreators(notesActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesSideBar);
