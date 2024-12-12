"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Id } from '../../../convex/_generated/dataModel';
import { Button } from '../ui/button';
import { AlertTriangle, Loader, X } from 'lucide-react';
import { useGetMessage } from '@/hooks/use-get-message';
import { useGetMessages } from '@/hooks/use-get-messages';
import Message from './message';
import { useCurrentMember } from '@/hooks/use-current-member';
import { useParams } from 'next/navigation';
import { useCreateMessage } from '@/hooks/use-create-message';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Data } from '@/lib/type';
import { differenceInMinutes, format } from 'date-fns';

const Editor = dynamic(() => import('../message-input/text-input'), { ssr: false });

type ThreadProps = {
    messageId: Id<"messages">;
    onClose: () => void;     
}

const Thread: React.FC<ThreadProps> = ({ messageId, onClose }) => {
    const [editorKey, setEditorKey] = useState(0);
    const [isPending, setIsPending] = useState(false);
    const [replyMessage, setReplyMessage] = useState("");
    const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

    const { userId } = useAuth();
    const { workspaceId, channelId } = useParams<{ workspaceId: string, channelId: string }>();
    const { data: currentMember } = useCurrentMember(workspaceId as Id<"workspaces">);
    const { mutateAsync: replyMessageMutation } = useCreateMessage();
    const { data: message, isLoading: isLoadingMessage } = useGetMessage(messageId);
    const { data: messagesData, isLoading: messagesLoading } = useGetMessages({
      channelId: channelId as Id<"channels">,
      parentMessageId: messageId
    });

    const messages = messagesData as Data;
    const groupedMessages = messages?.page.reduce((acc, message) => {
        const date = new Date(message._creationTime);
        const dateKey = format(date, 'yyyy-MM-dd');
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].unshift(message);
        return acc;
    }, {} as Record<string, Data['page']>);

    if (isLoadingMessage) {
        return (
            
            <div className='h-full flex flex-col'>
                <div className="flex justify-between items-center h-[49px] px-4 border-b">
                    <p className="text-lg font-bold">Thread</p>
                    <Button
                        variant='ghost'
                        onClick={onClose}
                        size={'icon'}
                    >
                        <X className='size-5 stroke-[1.5]' />
                    </Button>
                </div>
                <div className="flex h-full items-center justify-center">
                    <Loader className='shrink-0 animate-spin size-5 text-muted-foreground' />
                </div>
            </div>
        )
    }

    if (!message) {
        return (
            <div className='h-full flex flex-col'>
                <div className="flex justify-between items-center h-[49px] px-4 border-b">
                    <p className="text-lg font-bold">Thread</p>
                    <Button
                        variant='ghost'
                        onClick={onClose}
                        size={'icon'}
                    >
                        <X className='size-5 stroke-[1.5]' />
                    </Button>
                </div>
                <div className="flex flex-col gap-y-2 h-full items-center justify-center">
                    <AlertTriangle className='shrink-0 size-5 text-muted-foreground' />
                    <p className="text-sm text-muted-foreground">
                        Message not found
                    </p>
                </div>
            </div>
        )
    }

    const handleReplyMessage = (content: string) => {
        replyMessageMutation({
            userId: userId!,
            workspaceId: workspaceId as Id<"workspaces">,
            channelId: channelId as Id<"channels">,
            parentMessageId: messageId,
            content
        }, {
            onSuccess: () => {
                setReplyMessage("");
                setEditorKey((prev) => prev + 1);
            },
            onError: () => {
              toast.error('Failed to create message');
            }
        });
    }

    return (
        <div className='h-full flex flex-col pb-2'>
            <div className="flex justify-between items-center h-[49px] px-4 border-b">
                <p className="text-lg font-bold">Thread</p>
                <Button
                    variant='ghost'
                    onClick={onClose}
                    size={'icon'}
                >
                    <X className='size-5 stroke-[1.5]' />
                </Button>
            </div>
            <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto">

                {/* start here */}

                {Object.entries(groupedMessages || {}).map(([date, messages]) => (
                    <div key={date} className="">
                        <div className="text-center my-2 relative">
                            <hr className='absolute top-1/2 left--0 right-0 border-t border-muted-foreground' />
                            <span className='relative inline-block px-4 py-1 rounded-full text-xs border border-muted-foreground shadow-sm'>
                                {format(new Date(date), 'MMM dd, yyyy')}
                            </span>
                        </div>
                        {messages.map((message, index) => {
                            const prevMessage = messages[index - 1];
                            const isCompact =
                                prevMessage &&
                                prevMessage.memberId === message.memberId &&
                                differenceInMinutes(
                                    new Date(message._creationTime),
                                    new Date(prevMessage._creationTime)
                                ) < 5;
                            return (
                                <div key={message._id} className="mb-2">
                                    <Message
                                        hideThreadButton
                                        memberId={message.memberId}
                                        authorImage={message.user.image}
                                        isAuthor={message.memberId === currentMember?._id}
                                        body={message.content}
                                        createdAt={message._creationTime}
                                        updatedAt={message.updatedAt}
                                        id={message._id}
                                        reactions={message.reactions}
                                        isEditing={editingId === message._id}
                                        setEditingId={setEditingId}
                                        isCompact={isCompact}
                                        threadCount={message.threadCount}
                                    />
                                </div>
                            )
                        })}
                    </div>
                ))}

                {/* end here */}

                <Message
                    hideThreadButton
                    memberId={message.memberId}
                    authorImage={message.user.image}
                    isAuthor={message.memberId === currentMember?._id}
                    body={message.content}
                    createdAt={message._creationTime}
                    updatedAt={message.updatedAt}
                    id={message._id}
                    reactions={message.reactions}
                    isEditing={editingId === message._id}
                    setEditingId={setEditingId}
                    threadCount={message.threadCount}
                />
            </div>
            <div className="px-2">
                <Editor
                    key={editorKey}
                    submit={handleReplyMessage}
                    isEditing={false}
                    setContent={setReplyMessage}
                    content={replyMessage}
                    handleCancel={() => {}}
                />
            </div>
        </div>
    )
}

export default Thread
