import React, { PropTypes } from 'react';
import EditorButton from './EditorButton';

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'Blockquote', icon: 'format_quote', style: 'blockquote'},
  {label: 'UL', icon: 'format_list_bulleted', style: 'unordered-list-item'},
  {label: 'OL', icon: 'format_list_numbered', style: 'ordered-list-item'},
  {label: 'Code Block', icon: 'code', style: 'code-block'},
];

const BlockStyleControls = ({editorState, onToggle}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className='block-editor-controls'>
      {BLOCK_TYPES.map((type, i) =>
        <EditorButton
          key={i}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          icon={type.icon}
          style={type.style}
        />
      )}
    </div>
  );
};

BlockStyleControls.propTypes = {
  editorState: PropTypes.object,
  onToggle: PropTypes.func
};

export default BlockStyleControls;
