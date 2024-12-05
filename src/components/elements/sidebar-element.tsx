import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils';

const SidebarElementVariants = cva(
    "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
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

type SidebarElementProps = {
    label: string;
    id: string;
    icon: LucideIcon;
    variant?: VariantProps<typeof SidebarElementVariants>["variant"];
}

const SidebarElement = ({
    label, id, icon: Icon, variant
}: SidebarElementProps) => {
    const params = useParams<{ workspaceId: string }>();
  return (
    <Button
        variant={"ghost"}
        size={'sm'}
        className={cn(SidebarElementVariants({ variant }))}
        asChild
    >
      <Link
        href={`/workspace/${params.workspaceId}/channel/${id}`}
      >
        <Icon className='size-3.5 mr-1 shrink-0' />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  )
}

export default SidebarElement;
