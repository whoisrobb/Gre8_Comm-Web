"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Id, Doc } from '../../../convex/_generated/dataModel';
import { format } from 'date-fns';
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/components/ui/avatar';
import Toolbar from './toolbar';
import { useUpdateMessage } from '@/hooks/use-update-message';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useDeleteMessage } from '@/hooks/use-delete-message';
import { useToggleReaction } from '@/hooks/use-toggle-reaction';
import Reactions from './reactions';

const Editor = dynamic(() => import('@/components/message-input/text-input'), { ssr: false });

type MessageProps = {
    id: Id<"messages">;
    memberId: Id<"members">;
    authorImage?: string;
    authorName?: string;
    isAuthor: boolean;
    reactions: Array<
        Omit<Doc<"reactions">, "messageId"> & {
            count: number;
            memberIds: Id<"members">[];
        }
    >;
    body: Doc<"messages">["content"];
    createdAt: Doc<"messages">["_creationTime"];
    updatedAt?: Doc<"messages">["updatedAt"];
    isEditing: boolean;
    isCompact?: boolean;
    setEditingId: (id: Id<"messages"> | null) => void;
    hideThreadButton?: boolean;
    threadCount: number;
    threadTimestamp?: number;
};

const Message: React.FC<MessageProps> = ({
    id,
    memberId,
    authorImage,
    authorName = "Member",
    isAuthor,
    reactions,
    body,
    createdAt,
    updatedAt,
    isEditing,
    isCompact,
    setEditingId,
    hideThreadButton,
    threadCount,
    threadTimestamp,
}) => {
    const [editContent, setEditContent] = useState(body);
    const { mutateAsync: updateMessage, isPending: isUpdatingMessage } = useUpdateMessage();
    const { mutateAsync: deleteMessage, isPending: isDeletingMessage } = useDeleteMessage();
    const { mutateAsync: toggleReaction, isPending: isTogglingReaction } = useToggleReaction();
    const { userId } = useAuth();

    const isPending = isUpdatingMessage;

    const handleUpdateMessage = (content: string) => {
        console.log('Edited content: ', content);
        updateMessage({
            userId: userId!,
            messageId: id,
            content,
        }, {
            onSuccess: () => {
                toast.success('Message updated');
                setEditingId(null);
            },
            onError: () => {
                toast.error('Failed to update message');
            }
        });
        setEditingId(null);
    }

    const handleDeleteMessage = () => {
        deleteMessage({
            userId: userId!,
            messageId: id,
        }, {
            onSuccess: () => {
                toast.success('Message deleted');

                // TODO: Close thread if open
            },
            onError: () => {
                toast.error('Failed to delete message');
            }
        });
    }

    const handleToggleReaction = (value: any) => {
        toggleReaction({
            userId: userId!,
            messageId: id,
            value: value.native,
        }, {
            onError: () => {
                toast.error('Failed to add reaction');
            }
        });
    }

    const handleCancelEdit = () => {
        setEditContent(body);
        setEditingId(null);
    }

    if (isCompact) {
        return (
            <div className={cn(
                'relative flex leading-tight flex-col gap-2 p-1.5 pl-8 pr-1.5 transition-all group',
                isEditing ? 'bg-[#f2c74433]'
                : 'hover:bg-muted'
            )}>
                <div className="flex items-start gap-2">
                    <button className='text-xs text-muted-foreground text-center hover:underline'>
                        {format(new Date(createdAt), 'hh:mm a')}
                    </button>
                </div>
                {isEditing ? (
                    <div className="w-full h-full">
                        <Editor
                            setContent={setEditContent}
                            content={editContent}
                            submit={handleUpdateMessage}
                            isEditing={isEditing}
                            handleCancel={handleCancelEdit}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col w-full">
                        <div className="text-base" dangerouslySetInnerHTML={{ __html: body }} />
                        {updatedAt && (
                            <div className="text-xs text-muted-foreground">
                                Edited
                            </div>
                        )}
                        <Reactions
                            data={reactions}
                            onChange={handleToggleReaction}
                            // isPending={isTogglingReaction}
                        />
                    </div>
                )}
                {!isEditing && (
                    <Toolbar
                        isAuthor={isAuthor}
                        isPending={false}
                        handleEdit={() => setEditingId(id)}
                        handleThread={() => {}}
                        handleDelete={handleDeleteMessage}
                        handleReaction={handleToggleReaction}
                        hideThreadButton={hideThreadButton}
                    />
                )}
            </div>
        )
    }

    const avatarFallback = authorName.charAt(0).toUpperCase();

  return (
    <div className={cn(
        'relative flex flex-col gap-2 p-1.5 transition-all group',
        isEditing ? 'bg-[#f2c74433]'
        : 'hover:bg-muted'
    )}>
        <div className="flex items-start gap-2">
            <button>
                <Avatar className='size-5'>
                    <AvatarImage src={authorImage} />
                    <AvatarFallback>
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </button>
            {isEditing ? (
                <div className="w-full h-full">
                    <Editor
                        setContent={setEditContent}
                        content={editContent}
                        submit={handleUpdateMessage}
                        isEditing={isEditing}
                        handleCancel={handleCancelEdit}
                    />
                </div>
            ) : (
            <div className="flex flex-col w-full overflow-hidden">
                <div className="text-base">
                    <button onClick={() => {}} className='font-bold text-primary hover:underline'>{authorName}</button>
                    <span className="">
                        &nbsp;•&nbsp;
                    </span>
                    <button className='text-xs text-muted-foreground hover:underline'>
                        {format(new Date(createdAt), 'hh:mm a')}
                    </button>
                </div>
                <div className="flex flex-col w-full">
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: body }} />
                    {updatedAt && (
                        <div className="text-xs text-muted-foreground">
                            Edited
                        </div>
                    )}
                    <Reactions
                        data={reactions}
                        onChange={handleToggleReaction}
                        // isPending={isTogglingReaction}
                    />
                </div>
            </div>
            )}
        </div>
        {!isEditing && (
            <Toolbar
                isAuthor={isAuthor}
                isPending={false}
                handleEdit={() => setEditingId(id)}
                handleThread={() => {}}
                handleDelete={handleDeleteMessage}
                handleReaction={handleToggleReaction}
                hideThreadButton={hideThreadButton}
            />
        )}
    </div>
  )
}

export default Message
