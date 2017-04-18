import React, {PropTypes} from 'react';
import { TextField, RaisedButton } from 'material-ui';
import BlockStyleControls from '../components/BlockStyleControls';
import InlineStyleControls from '../components/InlineStyleControls';

const muiStyle = {
  field: {
    width: 152
  },
  input: {
    color: '#FFF'
  }
};

const EditorOptionsBar = ({title, handleInputChange, editorState, toggleBlockType, toggleInlineStyle, onSave}) => {
  return (
    <div className='notes-options'>
      <div className='options-container'>
        <div className='note-title'>
          <label>Title: </label>
          <TextField
            onChange={handleInputChange}
            hintText='Enter Title'
            value={title}
            style={muiStyle.field}
            inputStyle={muiStyle.input}
          />
        </div>
        <div className='editor-controls'>
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
          <RaisedButton
            onTouchTap={onSave}
            label='Save'
            backgroundColor='#175057'
            labelColor='#FFF'
          />
        </div>
      </div>
    </div>
  )
};

EditorOptionsBar.propTypes = {
  title: PropTypes.string,
  handleInputChange: PropTypes.func,
  editorState: PropTypes.object,
  onSave: PropTypes.func,
  toggleBlockType: PropTypes.func,
  toggleInlineStyle: PropTypes.func
};

export default EditorOptionsBar;
