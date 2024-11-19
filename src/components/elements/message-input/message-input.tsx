"use client";

import React, { useCallback, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"  
import { Button } from '../../ui/button'
import { FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import FileInput from './file-input';
import PreviewFiles from './preview-files';
import { Textarea } from '@/components/ui/textarea';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";


const MessageSchema = z.object({
    message: z.string().min(1).max(255)
});

type MessageInputSchema = z.infer<typeof MessageSchema>;

const MessageInput = () => {
    const { register, reset, getValues, setValue } = useForm<MessageInputSchema>({
        resolver: zodResolver(MessageSchema),
        defaultValues: {
            message: ""
        }
    });
    const [files, setFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [emojiOpen, setEmojiOpen] = useState(false);

    useEffect(() => {
        return () => {
          previewUrls.forEach(URL.revokeObjectURL);
        };
    }, [previewUrls]);
    
    const generatePreviewUrls = useCallback(() => {
        const newUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls(newUrls);
    }, [files]);
    
    useEffect(() => {
        generatePreviewUrls();
    }, [files, generatePreviewUrls]);

    const addEmoji = (emoji: any) => {
        const currentMessage = getValues("message");
        setValue("message", currentMessage + emoji.native);
        setEmojiOpen(false);
    };

  return (
    <div className='flex md:flex-row flex-col items-start w-full'>
        {files.length >= 1 &&
        <PreviewFiles
            files={files}
            previewUrls={previewUrls}
            setPreviewUrls={setPreviewUrls}
        />}

        <div className="flex items-center">
            <DropdownMenu open={emojiOpen} onOpenChange={setEmojiOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} size={'icon'}>
                        <FaceSmileIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                    <Picker
                        data={data}
                        onEmojiSelect={addEmoji}
                        theme="light"
                        previewPosition="none"
                        skinTonePosition="none"
                    />
                </DropdownMenuContent>
            </DropdownMenu>

            <FileInput
                setFiles={setFiles}
            />
        </div>
        
        <form
            className="relative w-full"
        >
            <Textarea
                {...register('message')}
                className="pe-9"
                placeholder="Type your message"
            />
            <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
            >
                <PaperAirplaneIcon className='size-6' aria-hidden="true" />
            </button>
        </form>
    </div>
  )
}

export default MessageInput
