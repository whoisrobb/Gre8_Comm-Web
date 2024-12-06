"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { 
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Id } from '../../../convex/_generated/dataModel';

const userItemsVariants = cva(
    "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
    {
        variants: {
            variant: {
                 default: "",
                 active: "text-[#481349] bg-background/90 hover:bg-background/90"
            }
        },
        defaultVariants: {
            variant: "default",
        }
    }
);

type UserItemProps = {
    memberId: Id<"members">;
    label?: string;
    image?: string;
    variant?: VariantProps<typeof userItemsVariants>["variant"];
}

const UserItem = ({
    memberId, label = "Member", image, variant
}: UserItemProps) => {
    const params = useParams<{ workspaceId: string }>();
    const avatarFallback = label.charAt(0).toUpperCase();

  return (
    <Button
        className={cn(userItemsVariants({ variant: variant }))}
        variant={'ghost'}
        size={'sm'}
    >
        <Link
            href={`/workspace/${params.workspaceId}/member/${memberId}`}
            className='flex items-center'
        >
            <Avatar className='size-5 rounded-md mr-1'>
                <AvatarImage className='rounded-md' src={image} />
                <AvatarFallback className='rounded-md'>
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>

            <span className="text-sm truncate">{label}</span>
        </Link>
    </Button>
  )
}

export default UserItem;
