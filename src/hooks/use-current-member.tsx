"use client";

import { useAuth } from "@clerk/nextjs";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export const useCurrentMember = (workspaceId: Id<"workspaces">) => {
    const { userId } = useAuth();

    return useQuery(
        convexQuery(api.members.current, { userId: userId!, workspaceId })
    );
};