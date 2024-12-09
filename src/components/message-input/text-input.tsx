import React, { Dispatch, SetStateAction } from 'react';
import Tiptap from './tiptap';

type TextInputProps = {
    placeholder?: string;
    submit: () => void;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
};

const TextInput = ({ placeholder, content, setContent, submit }: TextInputProps) => {
  return (
    <div>
      <Tiptap
        placeholder={placeholder}
        submit={submit}
        content={content}
        setContent={setContent}
      />
    </div>
  )
}

export default TextInput;
