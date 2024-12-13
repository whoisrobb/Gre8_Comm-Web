import React from 'react';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { ChevronRight } from 'lucide-react';

type ThreadBarProps = {
    count?: number;
    timestamp?: number;
    onClick?: () => void;
}

const ThreadBar: React.FC<ThreadBarProps> = ({ count, timestamp, onClick }) => {
    if (!count || !timestamp) return null;

  return (
    <button
        className='p-1 rounded-md hover:bg-primary-foreground hover:bg-opacity-10 border border-transparent hover:border-primary-foreground flex items-center justify-start group/thread-bar transition max-w-[600px]'
        onClick={onClick}
    >
        <div className="flex items-center gap-2 overflow-hidden">
            <Avatar className='size-6 shrink-0'>
                <AvatarImage src='/images/icons/reply.svg' />
                <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <span className="text-xs hover:underline font-bold trunncate">
                {count} {count === 1 ? 'Reply' : 'Replies'}
            </span>
            <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:block hidden">
                Last reply {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
            </span>
            <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:block hidden">
                Click to view
            </span>
        </div>
        <ChevronRight className='size-4 text-muted-foreground ml-auto opacity-0 group-hover/threa-bar:opacity-100 transition shrink-0' />
    </button>
  )
}

export default ThreadBar
