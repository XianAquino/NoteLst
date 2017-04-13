import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import updateNote from '../util/updateNote';
import getNote from '../util/getNote';
import _ from 'underscore';
import { Editor, EditorState } from 'draft-js';

const debounceUpdate = _.debounce(updateNote,500);
const muiStyle = {
  paper: {
    width: 800,
    height: 1200,
    margin: '10px auto',
    padding: '20px'
  }
};

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: EditorState.createEmpty()
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    const { userId, params } = this.props;
    getNote(userId, params.noteId, (result) => {
      this.setState({
        title: result.title,
      });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value }, () => {
      //debounceUpdate(this.props.params.noteId, this.state);
    });
  }

  editorOnChange = (editorState) => (
    this.setState({editorState})
  )

  render() {
    const { note } = this.props;
    return(
      <div>
        <input
          onChange={this.handleInputChange}
          name='title'
          value={this.state.title}
        />
        <Paper style={muiStyle.paper}>
          <Editor editorState={this.state.editorState} onChange={this.editorOnChange}/>
        </Paper>
      </div>
    )
  }
};

NoteEditor.propTypes = {
  params: React.PropTypes.object,
  userId: React.PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    userId: state.userInfo.id
  };
};

export default connect(mapStateToProps)(NoteEditor);
