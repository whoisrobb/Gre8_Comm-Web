"use client";

import React from 'react';
import TextInput from '../message-input/text-input';

const Editor = () => {
    
  return (
    <div className='flex flex-col'>
        <div className="flex flex-col rounded-md overflow-hidden">
            <TextInput />
        </div>
    </div>
  )
}

export default Editor;
