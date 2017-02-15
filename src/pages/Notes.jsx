import React, { Component } from 'react';
import createNote from '../util/createNote';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Notes extends Component {
  constructor(props){
    super(props);
    this.create = this.create.bind(this);
  }

  create() {
    const { userId } = this.props;
    createNote(userId, (response) => {
      const noteId = response.insertId;
      browserHistory.push(`/notes/${noteId}`);
    });
  }

  render() {
    const { params, userId } = this.props;
    console.log("username",params, userId);
    return(
      <div>
        <h1>Notes</h1>
        <button onClick={this.create}>Create Note</button>
      </div>
    )
  }
};

Notes.propTypes = {
  params: React.PropTypes.object,
  userId: React.PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    userId: state.userInfo.id
  }
}

export default connect(mapStateToProps)(Notes);
