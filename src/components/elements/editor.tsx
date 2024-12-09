"use client";

import React, { useState } from 'react';
import TextInput from '../message-input/text-input';

const Editor = () => {
    const [content, setContent] = useState('');
    
    const submit = () => {
        console.log(content);
    };

  return (
    <div className='flex flex-col'>
        <div className="flex flex-col rounded-md overflow-hidden">
            <TextInput
                submit={submit}
                content={content}
                setContent={setContent}
            />
        </div>
    </div>
  )
}

export default Editor;
