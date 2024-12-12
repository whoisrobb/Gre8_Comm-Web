import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useGetMember } from "@/hooks/use-get-member";
import { Id } from "../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useGetMessages } from "@/hooks/use-get-messages";
import { Loader } from "lucide-react";
import ConversationHeader from "./conversation-header";
import MessageList from "./message-list";
import { Data } from "@/lib/type";
import { useCreateMessage } from "@/hooks/use-create-message";
import { toast } from "sonner";

const Editor = dynamic(() => import('../message-input/text-input'), { ssr: false });

type ConversationProps = {
    userId: string;
    id: Id<"conversations">;
};

const Conversation = ({ id, userId }: ConversationProps) => {
    const [editorKey, setEditorKey] = useState(0);
    const [content, setContent] = useState("");
    const { workspaceId, memberId } = useParams<{ workspaceId: string, memberId: string }>();
    const { data: member, isLoading: memberLoading } = useGetMember(memberId as Id<"members">);
    const { mutateAsync } = useCreateMessage();
    const { data: messages, isLoading: messagesLoading } = useGetMessages({
        conversationId: id
    });

    if (memberLoading || messagesLoading) {
        return (
          <div className="h-full flex-1 flex items-center justify-center">
            <Loader className='size-5 animate-spin text-muted-foreground' />
          </div>
        );
    }

    const handleSendMessage = (content: string) => {
        mutateAsync({
            userId,
            workspaceId: workspaceId as Id<"workspaces">,
            conversationId: id,
            content: content
        }, {
            onSuccess: () => {
                setContent('');
                setEditorKey(editorKey + 1);
            },
            onError: () => {
                toast.error('Failed to send message');
            }
        });
    }

    return (
        <div className="flex flex-col h-full">
            <ConversationHeader
                title={`${member?.user.firstName} ${member?.user.lastName}`}
                memberImage={member?.user.image}
                onClick={() => {}}
            />

            <MessageList
                data={messages as Data}
                variant="conversation"
                memberImage={member?.user.image}
                memberName={`${member?.user.firstName} ${member?.user.lastName}`}
                
            />
            
            <div className="p-2">
                <Editor
                    key={editorKey}
                    content={content}
                    setContent={setContent}
                    submit={handleSendMessage}
                    placeholder={`Message ${member?.user.firstName}`} 
                />
            </div>
        </div>
    );
}

export default Conversation;
