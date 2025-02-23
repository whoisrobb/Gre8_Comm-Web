"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { Id } from "../../convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";

export const useGetMessage = (messageId: Id<"messages">) => {
    const { userId } = useAuth();

    return useQuery(
        convexQuery(api.messages.getById, { userId: userId!, messageId })
    );
};