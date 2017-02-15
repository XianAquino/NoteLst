import React, { Component } from 'react';
import createNote from '../util/createNote';
import getNotes from '../util/getNotes';
import deleteNote from '../util/deleteNote';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as notesActions from '../actions/notesActions';
import Note from '../components/Note.jsx';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
  }
  componentWillMount() {
    const { userId, actions } = this.props;
    getNotes(userId, (response) => {
      actions.loadNotes(response.data)
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

  remove(noteId) {
    const { actions } = this.props;
    actions.deleteNote(noteId);
    deleteNote(noteId);
  }

  render() {
    const { params, userId, notes } = this.props;
    return(
      <div>
        <h1>Notes</h1>
        <button onClick={this.create}>Create Note</button>
        <ul>
        {
          notes.map((note, i) =>
            <Note key={i} title={note.title} id={note.id} remove={this.remove}/>
          )
        }
        </ul>
      </div>
    )
  }
};

Notes.propTypes = {
  params: React.PropTypes.object,
  userId: React.PropTypes.number,
  notes: React.PropTypes.array,
  actions: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userId: state.userInfo.id,
    notes: state.notes
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(notesActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
