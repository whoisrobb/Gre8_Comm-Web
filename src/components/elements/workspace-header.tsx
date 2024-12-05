import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Doc } from '../../../convex/_generated/dataModel';
import { ChevronDown, ListFilter, SquarePen } from 'lucide-react';

type WorkspaceHeaderProps = {
    workspace: Doc<"workspaces">;
    isAdmin: boolean;
}

const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
  return (
    <div className='flex items-center justify-between px-4 h-[49px] gap-0.5'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant={'ghost'}
                className='font-semibold text-lg w-auto p-1.5 overflow-hidden'
                size={'sm'}
            >
                <span className="truncate">{workspace.name}</span>
                <ChevronDown className='size-4 ml-1 shrink-0' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            side='bottom'
            align="start"
            className={"w-64"}
        >
            <DropdownMenuItem className={"cursor-pointer capitalize"}>
                <div className="size-9 relative overflow-hidden shadow text-muted-foreground font-semibold text-xl rounded-md flex items-center justify-center mr-2">{workspace.name.charAt(0).toUpperCase()}</div>
                <div className="flex flex-col items-start">
                    <p className="font-bold">{workspace.name}</p>
                    <p className="text-xs text-muted-foreground">Active workspace</p>
                </div>
            </DropdownMenuItem>
            {isAdmin &&
            <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => {}}
                >
                    Invite people to { workspace.name}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => {}}
                >
                    Preferences
                </DropdownMenuItem>
            </>}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-0.5">
        <Button
            variant={"ghost"}
            size={"icon"}
        >
            <ListFilter className='size-4' />
        </Button>
        <Button
            variant={"ghost"}
            size={"icon"}
        >
            <SquarePen className='size-4' />
        </Button>
      </div>
    </div>
  )
}

export default WorkspaceHeader;
