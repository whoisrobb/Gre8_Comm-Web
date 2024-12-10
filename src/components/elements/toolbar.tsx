import React from 'react';
import { Button } from '../ui/button';
import { MessageSquareIcon, SmileIcon, Pencil } from 'lucide-react';
import { TrashIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
import EmojiPopover from '../message-input/emoji-popover';

type ToolbarProps = {
    isAuthor: boolean;
    isPending: boolean;
    handleEdit: () => void;
    handleThread: () => void;
    handleDelete: () => void;
    handleReaction: (value: string) => void;
    hideThreadButton?: boolean;
};

const Toolbar = ({
    isAuthor,
    isPending,
    handleEdit,
    handleThread,
    handleDelete,
    handleReaction,
    hideThreadButton,
}: ToolbarProps) => {
  return (
    <div className='absolute top-0 right-5'>
        <div className="group-hover:opacity-100 opacity-0 transition-opacity bg-background border rounded-md shadow-sm">
            <EmojiPopover
                addEmoji={handleReaction}
                className='size-7'
                side='left'
                align='start'
            />

            {!hideThreadButton &&
            <Button
                variant={'ghost'}
                size='icon'
                className='size-7'
                disabled={isPending}
                onClick={handleThread}
            >
                <ChatBubbleIcon className='size-2' />
            </Button>}

            {isAuthor &&
            <Button
                variant={'ghost'}
                size='icon'
                className='size-7'
                disabled={isPending}
                onClick={handleEdit}
            >
                <Pencil className='size-2' />
            </Button>}

            {isAuthor &&
            <Button
                variant={'ghost'}
                size='icon'
                className='size-7'
                disabled={isPending}
                onClick={handleDelete}
            >
                <TrashIcon className='size-2' />
            </Button>}
        </div>
    </div>
  )
}

export default Toolbar
