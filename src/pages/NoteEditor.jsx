import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import updateNote from '../util/updateNote';
import getNote from '../util/getNote';
import _ from 'underscore';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import EditorOptionsBar from '../components/EditorOptionsBar';
import '../css/editor.css';

const debounceUpdate = _.debounce(updateNote,500);

const muiStyle = {
  paper: {
    width: 800,
    minHeight: 1200,
    margin: '80px auto 10px',
    padding: '50px'
  }
};

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creator: null,
      title: '',
      editorState: EditorState.createEmpty()
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onChange = (editorState) => this.setState({editorState});
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.onTab = this.onTab.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    const { userId, params } = this.props;
    getNote(userId, params.noteId, (result) => {
      this.setState({
        title: result.title,
        creator: result.user_id,
      });
      const existingNote = result.note;
      if (existingNote) {
        this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(existingNote)))});
      }
    });
  }

  handleInputChange(event) {
    this.setState({title: event.target.value}, () => {
      debounceUpdate(this.props.params.noteId, {title: this.state.title});
    });
  }

  handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  toggleBlockType(type) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, type));
  }

  toggleInlineStyle(style) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }

  onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  onSave() {
    const content = this.state.editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    updateNote(this.props.params.noteId, {note: rawContent});
  }

  render() {
    const { note, userId } = this.props;
    const { editorState, creator, title } = this.state;
    // if the note is created by a different user, make it read-only
    if(creator !== userId) {
      return (
        <div>
          <h1>{title}</h1>
          <Paper style={muiStyle.paper}>
            <Editor
              editorState={editorState}
              readOnly={true}
            />
          </Paper>
        </div>
      )
    }
    return(
      <div className='notes-editor'>
        <EditorOptionsBar
          title={title}
          handleInputChange={this.handleInputChange}
          editorState={editorState}
          onSave={this.onSave}
          toggleBlockType={this.toggleBlockType}
          toggleInlineStyle={this.toggleInlineStyle}
        />
        <Paper style={muiStyle.paper}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            onTab={this.onTab}
            spellCheck={true}
          />
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
