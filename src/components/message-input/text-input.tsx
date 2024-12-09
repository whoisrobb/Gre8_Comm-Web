import React from 'react'
import Tiptap from './tiptap';

const TextInput = () => {
  return (
    <div>
      <Tiptap
        placeholder='Type a message...'
        submit={console.log}
      />
    </div>
  )
}

export default TextInput;
