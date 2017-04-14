import React from 'react';
import EditorButton from './EditorButton';

const BLOCK_TYPES = [
   {label: 'H1', style: 'header-one'},
   {label: 'H2', style: 'header-two'},
   {label: 'H3', style: 'header-three'},
   {label: 'Blockquote', style: 'blockquote'},
   {label: 'UL', style: 'unordered-list-item'},
   {label: 'OL', style: 'ordered-list-item'},
   {label: 'Code Block', style: 'code-block'},
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
         style={type.style}
       />
     )}
   </div>
 );
};

export default BlockStyleControls;
