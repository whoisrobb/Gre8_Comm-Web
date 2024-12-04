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

const WorkspaceSwitcher = () => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant={'ghost'}
                className='shadow size-10'
                size={'icon'}
            >
                W
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' side='right'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default WorkspaceSwitcher;
