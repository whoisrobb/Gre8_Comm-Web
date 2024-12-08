"use client";

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateChannel } from '@/hooks/use-create-channel';
import { useChannelStore } from '@/store/channel';
import { useGetChannels } from '@/hooks/use-get-channels';
import { Id } from '../../../../convex/_generated/dataModel';
import { useGetWorkspaceById } from '@/hooks/use-get-workspaces';
import { Loader, TriangleAlert } from 'lucide-react';

type WorkspaceIdPageProps = {
  params: {
    workspaceId: string;
  }
};

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  const { workspaceId } = params;
  const { open, setOpen } = useChannelStore((state) => state);
  const router = useRouter();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspaceById(workspaceId as Id<"workspaces">);
  const { data: channels, isLoading: channelsLoading } = useGetChannels(workspaceId as Id<"workspaces">);

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);

  useEffect(() => {
    if (workspaceLoading || channelsLoading) return;

    if (channelId) {
      router.replace(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [
    channelId,
    workspaceLoading,
    channelsLoading,
    workspace,
    open,
    router,
    setOpen,
    workspaceId
  ]);

  if (workspaceLoading || channelsLoading) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-2">
        <Loader className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-2">
        <TriangleAlert className='size-6 text-muted-foreground' />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );
  }

  return null;
}

export default WorkspaceIdPage
