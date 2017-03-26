import React, { Component } from 'react';
import Note from '../components/Note.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as notesActions from '../actions/notesActions';
import getNotes from '../util/getNotes';
import deleteNote from '../util/deleteNote';


class NotesContainer extends Component {

  componentWillMount() {
    const { userId, actions } = this.props;
    getNotes(userId, (response) => {
      actions.loadNotes(response.data)
    });
  }

  remove(noteId) {
    const { actions } = this.props;
    actions.deleteNote(noteId);
    deleteNote(noteId);
  }

  updateShareCount(noteId) {
    this.props.actions.updateNote(noteId);
  }

  render() {
    const { notes } = this.props;
    return (
      <div>
        <ul>
        {
          notes.map((note, i) =>
            <Note
              key={i}
              title={note.title}
              id={note.id}
              shared={note.shared}
              remove={this.remove.bind(this)}
              updateShareCount={this.updateShareCount.bind(this)}
            />
          )
        }
        </ul>
      </div>
    )
  }
}

NotesContainer.propTypes = {
  userId: React.PropTypes.number,
  notes: React.PropTypes.array,
  actions: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(notesActions, dispatch )
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
