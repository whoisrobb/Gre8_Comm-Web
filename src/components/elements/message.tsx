import React from 'react';
import { Id, Doc } from '../../../convex/_generated/dataModel';
import { format } from 'date-fns';
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/components/ui/avatar';

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

    if (isCompact) {
        return (
            <div className='flex flex-col gap-2 p-1.5 pl-8 pr-1.5 hover:bg-muted transition-all group'>
                <div className="flex items-start gap-2">
                    <button className='text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity leading-[22px] text-center hover:underline'>
                        {format(new Date(createdAt), 'hh:mm a')}
                    </button>
                </div>
                <div className="flex flex-col w-full">
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                    {updatedAt && (
                        <div className="text-xs text-muted-foreground">
                            Edited
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const avatarFallback = authorName.charAt(0).toUpperCase();

  return (
    <div className='flex flex-col gap-2 p-1.5 hover:bg-muted transition-all group'>
        <div className="flex items-start gap-2">
            <button>
                <Avatar className='size-5'>
                    <AvatarImage src={authorImage} />
                    <AvatarFallback>
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </button>
            <div className="flex flex-col w-full overflow-hidden">
                <div className="text-sm">
                    <button onClick={() => {}} className='font-bold text-primary hover:underline'>{authorName}</button>
                    <span className="">
                        &nbsp;•&nbsp;
                    </span>
                    <button className='text-xs text-muted-foreground hover:underline'>
                        {format(new Date(createdAt), 'hh:mm a')}
                    </button>
                </div>
                <div className="flex flex-col w-full">
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                    {updatedAt && (
                        <div className="text-xs text-muted-foreground">
                            Edited
                        </div>
                    )}
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Message
