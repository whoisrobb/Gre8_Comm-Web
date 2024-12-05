import React, { ReactNode } from 'react';
import { Button } from '../ui/button';
import { ChevronRight, PlusIcon } from 'lucide-react';
import { useToggle } from "react-use";
import { cn } from '@/lib/utils';

type WorkspaceSectionProps = {
    children: ReactNode;
    label: string;
    onNew?: () => void;
}

const WorkspaceSection = ({
    children, label, onNew
}: WorkspaceSectionProps) => {
    const [on, toggle] = useToggle(true);

  return (
    <div className='flex flex-col mt-3 px-2'>
        <div className="flex items-center px-3.5 group">
            <Button
                variant={"ghost"}
                className='p-0.5 text-sm shrink-0 size-6'
                onClick={toggle}
            >
                <ChevronRight className={cn(
                    'size-4 transition-transform',
                    on && "rotate-90"
                )}/> 
            </Button>
            <Button
                variant={"ghost"}
                size={'sm'}
                className='group px-1.5 text-sm h-[28px] justify-start overflow-hidden items-center'
            >
                <span className="truncate">{label}</span>
            </Button>
            {onNew && (
                <Button
                    onClick={onNew}
                    variant={"ghost"}
                    size={"icon"}
                    className='opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm size-6 shrink-0'
                >
                    <PlusIcon className='size-5' />
                </Button>
            )}
        </div>
        {on && children}
    </div>
  )
}

export default WorkspaceSection;
