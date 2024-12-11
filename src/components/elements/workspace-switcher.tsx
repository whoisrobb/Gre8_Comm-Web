"use client";

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"  
import { Button } from '../ui/button';
import { useParams, useRouter } from 'next/navigation';
import { useGetWorkspace, useGetWorkspaceById } from '@/hooks/use-get-workspaces';
import { Id } from '../../../convex/_generated/dataModel';
import { useWorkspaceStore } from '@/store/workspace';
import { Loader, Plus } from 'lucide-react';
import Link from 'next/link';

const WorkspaceSwitcher = () => {
    const params = useParams<{ workspaceId: string }>();
    const router = useRouter();
    const setModalOpen = useWorkspaceStore((state) => state.setOpen);
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspaceById(params.workspaceId as Id<"workspaces">);
    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspace();

    const filteredWorkspaces = workspaces?.filter((space) => space._id !== params.workspaceId);

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant={'ghost'}
                className='shadow size-10 bg-background'
                size={'icon'}
                onClick={() => router.push(`/workspace/${params.workspaceId}`)}
            >
                {workspaceLoading ? (<Loader className='size-5 animate-spin shrink-0' />)
                : (workspace?.name.charAt(0).toLocaleUpperCase())}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' side='right'>
            <DropdownMenuItem
                className='cursor-pointer flex-col justify-start items-start capitalize'
            >
                {workspace?.name}
                <span className="text-xs text-muted-foreground">Active workspace</span>
            </DropdownMenuItem>

            {filteredWorkspaces?.map((space) => (
                <DropdownMenuItem
                    key={space._id}
                    className='cursor-pointer capitalize overflow-hidden'
                    onClick={() => router.push(`/workspace/${space._id}`)}
                >
                    <div className="size-9 shrink-0 relative overflow-hidden bg-muted-foreground font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                        {space.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="truncate">
                        {space.name}
                    </p>
                </DropdownMenuItem>
            ))}

            <DropdownMenuItem
                onClick={() => setModalOpen(true)}
                className='cursor-pointer'
            >
                <div className="size-9 relative overflow-hidden bg-muted font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                    <Plus />
                </div>
                Create new workspace
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default WorkspaceSwitcher;
