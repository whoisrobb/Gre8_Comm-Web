"use client";

import React from 'react';
import { Doc, Id } from '../../../convex/_generated/dataModel';
import { useParams } from 'next/navigation';
import { useCurrentMember } from '@/hooks/use-current-member';
import { cn } from '@/lib/utils';
import EmojiPopover from '../message-input/emoji-popover';

type ReactionsProps = {
    data: Array<
        Omit<Doc<"reactions">, "messageId"> & {
            count: number;
            memberIds: Id<"members">[];
        }
    >;
    onChange: (value: any) => void;
}

const Reactions = ({
    data,
    onChange
}: ReactionsProps) => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { data: currentMember } = useCurrentMember(workspaceId as Id<"workspaces">);

    const currentMemberId = currentMember?._id;

    if (data.length === 0 || !currentMemberId) {
        return null;
    }

  return (
    <div className='flex items-center gap-1 my-1'>
        {data.map((reaction) => (
            <button
                key={reaction.value}
                onClick={() => onChange(reaction.value)}
                className={cn(
                "h-6 px-2 rounded-lg bg-muted/50 border border-transparent flex items-center gap-x-1",
                reaction.memberIds.includes(currentMemberId) && "bg-primary/50 border-primary"
            )}>
                {reaction.value}
                <span className={cn(
                    "text-xs font-semibold text-muted-foreground",
                    reaction.count > 0 && "text-primary"
                )}>
                    {reaction.count}
                </span>
            </button>
        ))}
        <EmojiPopover
            addEmoji={(emoji) => onChange(emoji)}
        />

    </div>
  )
}

export default Reactions
