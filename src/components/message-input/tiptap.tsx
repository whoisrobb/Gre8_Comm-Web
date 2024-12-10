"use client";

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, Dispatch, SetStateAction, useMemo } from 'react';
import Toolbar from './toolbar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LetterCaseCapitalizeIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from '../ui/button';
import { Smile } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import EmojiPopover from './emoji-popover';

type TiptapProps = {
    placeholder?: string;
    submit: () => void;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
}

const Tiptap = ({
    placeholder = "Type a message",
    submit,
    content,
    setContent,
}: TiptapProps) => {
    const [showToolbar, setShowToolbar] = useState(true);
    const editor = useEditor({
        extensions: [StarterKit.configure()],
        content: content,
        editorProps: {
            attributes: {
                class: "focus-visible:outline-none",
            }
        },
        onUpdate({ editor }) {
            setContent(editor.getHTML())
        }
    })

  return (
    <div className="rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none">
        <Toolbar editor={editor} className={showToolbar ? 'block' : 'hidden'} />
        <EditorContent
            editor={editor}
            placeholder={placeholder}
        />
        <InputTools
            editor={editor}
            setShowToolbar={setShowToolbar}
            content={content}
            submit={submit}
        />
    </div>
  )
}

export default Tiptap;

type InputToolsProps = {
    editor: Editor | null;
    setShowToolbar: Dispatch<SetStateAction<boolean>>;
    content: string;
    submit: () => void;
}

const InputTools = ({ editor, setShowToolbar, content, submit }: InputToolsProps) => {    
    if (!editor) {
        return null;
    }

    const isContentEmpty = useMemo(() => {
        return content.replace(/<[^>]*>/g, '').trim().length === 0;
    }, [content]);

    const addEmoji = (emoji: any) => {
        editor.chain().focus().insertContent(emoji.native).run();
    };

    return (
        <div className="">
            <Button
                variant={"ghost"}
                size={'icon'}
                onClick={() => setShowToolbar((prev) => !prev)}
            >
                <LetterCaseCapitalizeIcon className='size-4' />
            </Button>

            <EmojiPopover
                addEmoji={addEmoji}
            />

            <Button
                className='float-right'
                size={'sm'}
                disabled={isContentEmpty}
                onClick={submit}
            >
                <PaperPlaneIcon className='size-4' />
            </Button>
        </div>
    )
};