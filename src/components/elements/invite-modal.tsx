"use client";

import React, { Dispatch, SetStateAction } from 'react';
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import CopyButton from '@/components/ui/copy-button';
import { useParams } from 'next/navigation';
import { useCreateJoinCode } from '@/hooks/use-new-join-code';
import { Button } from '../ui/button';
import { RefreshCcw } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Id } from '../../../convex/_generated/dataModel';

type InviteModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    name: string;
    joinCode: string;
};

const InviteModal = ({ open, setOpen, name, joinCode }: InviteModalProps) => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { userId } = useAuth();
    const { mutateAsync, isPending } = useCreateJoinCode();
    const copyText = `${window.location.origin}/join/${workspaceId}`

    const handleNewCode = () => {
        mutateAsync({
            userId: userId!, workspaceId: workspaceId as Id<"workspaces">
        }, {
            onSuccess: () => {
                toast.success("Invite code regenerated");
            },
            onError: () => {
                toast.error("Failed to regenerate invite code");
            },
        });
    }
    return (
    <Dialog
        open={open}
        onOpenChange={setOpen}
    >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Invite people to {name}

                    <DialogDescription>
                        Use the code below to invite people to your workspace
                    </DialogDescription>
                </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-y-4 items-center justify-center py-10">
                <p className="text-4xl font-bold tracking-widest">{joinCode}</p>
            </div>
            
            <CopyButton
                btnText={"Copy link"}
                copyText={copyText}
                variant="outline"
                size="default"
            />

            <div className="flex items-center justify-between w-full">
                <Button
                    onClick={handleNewCode}
                    disabled={isPending}
                    variant={"ghost"}
                >
                    Generate new code
                    <RefreshCcw className='size-4 ml-2' />
                </Button>

                <DialogClose asChild>
                    <Button>Close</Button>
                </DialogClose>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default InviteModal;
