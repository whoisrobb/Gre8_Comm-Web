"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";


export const useGetBasicInfo = (workspaceId: Id<"workspaces">) => {
    const { userId } = useAuth();

    return useQuery(
        convexQuery(api.workspaces.getBasicInfoById, { userId: userId!, workspaceId })
    );
};