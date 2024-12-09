import React, { HTMLAttributes } from 'react';
import { type Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';
import {
    BoldIcon,
    CodeIcon,
    CodeSquare,
    Heading1Icon,
    ItalicIcon,
    ListIcon,
    ListOrderedIcon,
    StrikethroughIcon
} from 'lucide-react';
import { QuoteIcon } from "@radix-ui/react-icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from '@/lib/utils';


type ToolbarProps = HTMLAttributes<HTMLDivElement> & {
    editor: Editor | null;
    className?: string;
}

const toolbarElements = [
    {
        name: 'heading',
        icon: <Heading1Icon />,
        tooltip: 'Heading',
        action: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
        name: 'bold',
        icon: <BoldIcon />,
        tooltip: 'Bold',
        action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    },
    {
        name: 'italic',
        icon: <ItalicIcon />,
        tooltip: 'Italic',
        action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    },
    {
        name: 'strike-through',
        icon: <StrikethroughIcon />,
        tooltip: 'Strike',
        action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    },
    {
        name: 'ordered-list',
        icon: <ListOrderedIcon />,
        tooltip: 'Numbered list',
        action: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
    },
    {
        name: 'unordered-list',
        icon: <ListIcon />,
        tooltip: 'Unordered list',
        action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    },
    {
        name: 'block-quote',
        icon: <QuoteIcon />,
        tooltip: 'Block quote',
        action: (editor: Editor) => editor.chain().focus().toggleBlockquote().run(),
    },
    {
        name: 'code',
        icon: <CodeIcon />,
        tooltip: 'Code',
        action: (editor: Editor) => editor.chain().focus().toggleCode().run(),
    },
    {
        name: 'code-block',
        icon: <CodeSquare />,
        tooltip: 'Code block',
        action: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
    },
]

const Toolbar = ({ editor, className }: ToolbarProps) => {
    if (!editor) {
        return
    }
  return (
    <div className={cn('flex items-center gap-1', className)}>
        <TooltipProvider>
            {toolbarElements.map((element) => (
                <Tooltip key={element.name}>
                    <TooltipTrigger>
                        <Toggle
                            size={'sm'}
                            pressed={editor.isActive(element.name)}
                            onPressedChange={() => element.action(editor)}
                        >
                            {element.icon}
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{element.tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </TooltipProvider>
    </div>
  )
}

export default Toolbar;
