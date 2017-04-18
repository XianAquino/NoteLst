import React, { PropTypes } from 'react';
import EditorButton from './EditorButton';

var INLINE_STYLES = [
  {label: 'Bold', icon: 'format_bold', style: 'BOLD'},
  {label: 'Italic', icon: 'format_italic', style: 'ITALIC'},
  {label: 'Underline', icon: 'format_underline', style: 'UNDERLINE'},
  {label: 'Strikethrough', icon: 'format_strikethrough', style: 'STRIKETHROUGH'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = ({editorState, onToggle}) => {
  var currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className='inline-editor-controls'>
      {INLINE_STYLES.map((type, i) =>
        <EditorButton
          key={i}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          icon={type.icon}
          style={type.style}
        />
      )}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.object,
  onToggle: PropTypes.func
};

export default InlineStyleControls;
