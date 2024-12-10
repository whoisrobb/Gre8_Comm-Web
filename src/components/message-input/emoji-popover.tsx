import React, { HTMLAttributes } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '../ui/button';
import { Smile } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

type EmojiPopoverProps = HTMLAttributes<HTMLDivElement> & {
    addEmoji: (emoji: string) => void;
    side?: "left" | "top" | "right" | "bottom";
    align?: "center" | "end" | "start";
}

const EmojiPopover = (
    { addEmoji, className, side = "top", align = "center"}: EmojiPopoverProps
) => {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button
                variant={"ghost"}
                size={'icon'}
                className={className}
            >
                <Smile className='size-4' />
            </Button>
        </PopoverTrigger>
        <PopoverContent
            side={side}
            align={align}
            className='w-full h-full p-2'
        >
            <Picker data={data} onEmojiSelect={addEmoji} />
        </PopoverContent>
    </Popover>
  )
}

export default EmojiPopover
