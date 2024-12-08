"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { convexQuery } from "@convex-dev/react-query";
import { Id } from "../../convex/_generated/dataModel";


export const useGetChannel = (channelId: Id<"channels">) => {
    const { userId } = useAuth();

    return useQuery(
        convexQuery(api.channels.getById, { userId: userId!, channelId })
    );
};