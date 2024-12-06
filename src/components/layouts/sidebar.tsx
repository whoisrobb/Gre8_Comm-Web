"use client";

import { useCurrentMember } from '@/hooks/use-current-member';
import { useParams } from 'next/navigation';
import React from 'react';
import { Id } from '../../../convex/_generated/dataModel';
import { useGetWorkspaceById } from '@/hooks/use-get-workspaces';
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from 'lucide-react';
import WorkspaceHeader from '../elements/workspace-header';
import SidebarElement from '../elements/sidebar-element';
import { useGetChannels } from '@/hooks/use-get-channels';
import WorkspaceSection from '../elements/workspace-section';
import { useGetMembers } from '@/hooks/use-get-members';
import UserItem from '../elements/user-item';

const Sidebar = () => {
    const params = useParams<{ workspaceId: string }>();
    const { data: member, isLoading: memberLoading } = useCurrentMember(params.workspaceId as Id<"workspaces">);
    const { data: workspace, isLoading: workspaceLoading} = useGetWorkspaceById(params.workspaceId as Id<"workspaces">);
    const { data: channels, isLoading: channelsLoading } = useGetChannels(params.workspaceId as Id<"workspaces">);
    const { data: members, isLoading: membersLoading } = useGetMembers(params.workspaceId as Id<"workspaces">);

    if (workspaceLoading || memberLoading) {
        return (
            <div className="flex flex-col h-full items-center justify-center">
                <Loader className='shrink-0 animate-spin size-5' />
            </div>
        )
    }

    if (!workspace || !member) {
        return (
            <div className="flex flex-col h-full items-center justify-center">
                <AlertTriangle className='shrink-0 size-5' />
                <p className="text-sm">
                    Workspace not found
                </p>
            </div>
        )
    }
  return (
    <div className='flex flex-col h-full'>
      <WorkspaceHeader workspace={workspace} isAdmin={member.role == "admin"} />
        <div className={"flex flex-col px-2 mt-3"}>
            <SidebarElement
                label='Threads'
                icon={MessageSquareText}
                id={"threads"}
            />
            <SidebarElement
                label='Drafts & Sent'
                icon={SendHorizonal}
                id={"drafts"}
            />
        </div>
        <WorkspaceSection
            label={"Channels"}
            onNew={() => {}}
        >
            {channels?.map((item) => (
                <SidebarElement
                    key={item._id}
                    icon={HashIcon}
                    label={item.name}
                    id={item._id}
                />
            ))}
        </WorkspaceSection>

        <WorkspaceSection
            label={"Direct Messages"}
            onNew={() => {}}
        >
            {members?.map((item) => (
                <UserItem
                    key={item._id}
                    memberId={item._id}
                    label={`${item.user.firstName} ${item.user.lastName}`}
                    image={item.user.image}
                />
            ))}
        </WorkspaceSection>
    </div>
  )
}

export default Sidebar
