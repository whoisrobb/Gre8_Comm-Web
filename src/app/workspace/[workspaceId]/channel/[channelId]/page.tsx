"use client";

import { useGetChannel } from '@/hooks/use-get-channel';
import React, { useState } from 'react';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { Loader, TriangleAlert } from 'lucide-react';
import ChannelHeader from '@/components/elements/channel-header';
import TextInput from '@/components/message-input/text-input';
import { useCreateMessage } from '@/hooks/use-create-message';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { useGetMessages } from '@/hooks/use-get-messages';
import MessageList from '@/components/elements/message-list';
import { Data } from '@/lib/type';

type ChannelPageProps = {
  params: {
    workspaceId: string;
    channelId: string;
  }
};

const ChannelPage = ({ params }: ChannelPageProps) => {
  const { workspaceId, channelId } = params;
  const [content, setContent] = useState('');

  const { userId } = useAuth();
  const { data: channel, isLoading: channelLoading } = useGetChannel(channelId as Id<"channels">);
  const { data: messages, isLoading: messagesLoading } = useGetMessages({
    channelId: channelId as Id<"channels">
  });
  const { mutateAsync } = useCreateMessage();

  if (channelLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className='size-5 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="h-full flex-1 flex gap-y-2 items-center justify-center flex-col gap-2">
        <TriangleAlert className='size-5 text-muted-foreground' />
        <p className='text-sm text-muted-foreground'>Channel not found</p>
      </div>
    );
  }
    
  const submit = () => {
    mutateAsync({
      userId: userId!,
      workspaceId: workspaceId as Id<"workspaces">,
      channelId: channelId as Id<"channels">,
      content
    }, {
      onSuccess: () => {
        setContent('');
      },
      onError: () => {
        toast.error('Failed to create message');
      }
    });
    console.log(content);
  };
  

  return (
    <div className='flex flex-col h-full'>
      <ChannelHeader
        title={channel.name}      
      />

      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={messages as Data}
      />

      <div className="flex-1 flex flex-col-reverse py-2">
        
        <div className='flex flex-col'>
          <div className="flex flex-col rounded-md overflow-hidden">
            <TextInput
              submit={submit}
              content={content}
              setContent={setContent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChannelPage
