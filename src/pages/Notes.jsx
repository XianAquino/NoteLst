import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import NotesContainer from '../containers/NotesContainer';
import NotesSideBar from '../components/NotesSideBar';
import '../css/notes.css';

const Notes = ({params, userId}) => {
  if (userId) {
    return(
      <div className='container-fluid'>
        <div className='row'>
          <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
            <NotesSideBar userId={userId}/>
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
};

Notes.propTypes = {
  params: PropTypes.object,
  userId: PropTypes.number,
};

const mapStateToProps = (state) => ({
  userId: state.userInfo.id,
});

export default connect(mapStateToProps)(Notes);
