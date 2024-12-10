"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { Id } from "../../convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
import { usePaginatedQuery } from "convex/react";

const BATCH_SIZE = 20;

type UseGetMessagesProps = {
    channelId?: Id<"channels">;
    conversationId?: Id<"conversations">;
    parentMessageId?: Id<"messages">;
};

export const useGetMessages = ({
    channelId,
    conversationId,
    parentMessageId,
}: UseGetMessagesProps) => {
    const { userId } = useAuth();

    return useQuery(
        convexQuery(
            api.messages.get,
            { userId: userId!, channelId, conversationId, parentMessageId },
            // { batchSize: BATCH_SIZE }
        )
    );
};