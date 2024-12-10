import React, { Dispatch, SetStateAction } from 'react';
import Tiptap from './tiptap';

type TextInputProps = {
  placeholder?: string;
  submit: (content: string) => void;
  content: string;
  isEditing?: boolean;
  setContent: Dispatch<SetStateAction<string>>;
  handleCancel?: () => void;
};

const TextInput = ({ placeholder, content, setContent, submit, isEditing, handleCancel }: TextInputProps) => {
  return (
    <div>
      <Tiptap
        placeholder={placeholder}
        submit={submit}
        content={content}
        setContent={setContent}
        isEditing={isEditing}
        handleCancel={handleCancel}
      />
    </div>
  )
}

export default TextInput;
