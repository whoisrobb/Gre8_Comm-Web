import { useParentMessageId } from "@/store/parent-message-id";

export const usePanel = () => {
    const [parentMessageId, setParentMessageId] = useParentMessageId();

    const  onOpenMessage = (messageId: string) => {
        setParentMessageId(messageId);
    };

    const onCloseMessage = () => {
        setParentMessageId(null);
    };

    return {
        parentMessageId,
        onOpenMessage,
        onCloseMessage,
    };
}
