import React, { Component } from 'react';
import createNote from '../util/createNote';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as notesActions from '../actions/notesActions';
import NotesContainer from '../containers/NotesContainer';


class Notes extends Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
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
    const { params, userId } = this.props;
    if (userId) {
      return(
        <div className='container-fluid'>
          <div className='row'>
            <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
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

const mapStateToProps = (state) => {
  return {
    userId: state.userInfo.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(notesActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
