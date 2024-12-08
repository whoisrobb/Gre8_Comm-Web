"use client";

import { Button } from '@/components/ui/button';
import { useGetBasicInfo } from '@/hooks/use-get-basic-info';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';
import VerificationInput from 'react-verification-input';
import { Id } from '../../../../convex/_generated/dataModel';
import { Loader } from 'lucide-react';
import { useJoinWorkspace } from '@/hooks/use-join-workspace';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type JoinPageProps = {
  params: {
    workspaceId: string;
  }
}

const JoinPage = ({ params }: JoinPageProps) => {
  const { data, isLoading } = useGetBasicInfo(params.workspaceId as Id<"workspaces">);
  const { userId } = useAuth();
  const { mutateAsync, isPending } = useJoinWorkspace();
  const router = useRouter();

  const isMember = useMemo(() => data?.isMember, [data?.isMember]);

  useEffect(() => {
    if (isMember) {
      router.replace(`/workspace/${params.workspaceId}`);
    }
  }, [isMember, router, params.workspaceId]);

  const handleComplete = (value: string) => {
    mutateAsync({
      userId: userId!, joinCode: value, workspaceId: params.workspaceId as Id<"workspaces">
    }, {
      onSuccess: (id) => {
        router.replace(`/workspace/${id}`);
        toast.success(`Successfully joined "${data?.name}"`);
      },
      onError: () => {
        toast.error('Failed to join workspace');
      }
    })
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col gap-y-8 items-center justify-center p-8 rounded-lg shadow-md'>
      <Image
        src={"/logo.svg"}
        width={60}
        height={60}
        alt={"Logo"}
      />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join {data?.name}</h1>
          <p className="text-md text-muted-foreground">Enter the workspace code to join</p>
        </div>

        <VerificationInput
          onComplete={handleComplete}
          length={6}
          classNames={{
            container: cn("flex gap-x-2", isPending && "opacity-50 cursor-not-allowed"),
            character: "h-auto rounded-md border border-muted-foreground flex items-center justify-center text-lg font-md text-muted-foreground",
            characterInactive: "bg-muted",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button
          size={'lg'}
          variant={'outline'}
          asChild
        >
          <Link
            href={"/"}
          >
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default JoinPage;
