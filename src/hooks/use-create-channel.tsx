"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";

export const useCreateChannel = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.channels.create),
    });
};