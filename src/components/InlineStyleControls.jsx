import React from 'react';
import EditorButton from './EditorButton';

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
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
         style={type.style}
       />
     )}
   </div>
 );
};

export default InlineStyleControls;
