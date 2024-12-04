import React from 'react';
import { UserButton } from '@clerk/nextjs';
import {
  Dock,
  HomeIcon,
  Megaphone,
  MessageCircleMore,
  MessageSquare,
  Scan,
  UsersRound
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModeToggle } from '../ui/mode-toggle';
import WorkspaceSwitcher from '../elements/workspace-switcher';

const Toolbar = () => {
  return (
    <div className="">
        <div className='overflow-y-hidden sticky top-2 h-[calc(100vh-16px)]'>
            <ToolbarItems />
        </div>
    </div>
  )
}

export default Toolbar

const ToolbarItems = () => {
    return (
        <aside className='z-20 flex h-full flex-col'>
            <nav className="px-1 py-4">
                <WorkspaceSwitcher />
            </nav>

          <nav className='grid gap-1 px-2 py-4'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-lg'
                    aria-label='Playground'
                    asChild
                  >
                    <Link href='/'>
                      <HomeIcon className='size-5' />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={5}>
                  Home
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
  
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-lg bg-muted'
                    aria-label='Playground'
                  >
                    <MessageSquare className='size-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={5}>
                  Chats
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
  
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-lg'
                    aria-label='Models'
                  >
                    <UsersRound className='size-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={5}>
                  Communities
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
  
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-lg'
                    aria-label='API'
                  >
                    <Scan className='size-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={5}>
                  Status
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
  
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-lg'
                    aria-label='Documentation'
                  >
                    <MessageCircleMore className='size-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={5}>
                  Channels
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
  
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-lg'
                    aria-label='Settings'
                  >
                    <Dock className='size-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={5}>
                  Tools
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
  
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-lg'
                    aria-label='Settings'
                  >
                    <Megaphone className='size-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={5}>
                  Advertise
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
  
          <nav className='mt-auto grid gap-2 px-2 py-4'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={5}>
                  Theme
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
  
            <div className='flex items-center justify-center'>
              <UserButton />
            </div>
          </nav>
        </aside>
    )
}