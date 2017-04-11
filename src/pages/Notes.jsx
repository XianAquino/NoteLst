import React, { Component } from 'react';
import createNote from '../util/createNote';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as notesActions from '../actions/notesActions';
import NotesContainer from '../containers/NotesContainer';
import SearchedNotes from '../containers/SearchedNotes';
import searchNotes from '../util/searchNotes';
import _ from 'underscore';

const debounceSearch = _.debounce(searchNotes, 500);

class Notes extends Component {
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
    const { params, userId, searchedNotes } = this.props;
    if (userId) {
      return(
        <div className='container-fluid'>
          <div className='row'>
            <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
              <input onChange={this.handleInputChange} placeholder='search notes'/>
              {
               this.state.query ? <SearchedNotes notes={searchedNotes}/> : null
              }
              <button onClick={this.create}>Create Note</button>
            </aside>
            <div className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>
              <h1>Notes</h1>
              <NotesContainer userId={userId} />
            </div>
          </div>
        </div>
      )
    }
    return null;
  }
};

Notes.propTypes = {
  params: React.PropTypes.object,
  userId: React.PropTypes.number,
  actions: React.PropTypes.object
};

const mapStateToProps = (state) => ({
    userId: state.userInfo.id,
    searchedNotes: state.searchedNotes
});

const mapDispatchToProps = (dispatch) =>  ({
    actions: bindActionCreators(notesActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
