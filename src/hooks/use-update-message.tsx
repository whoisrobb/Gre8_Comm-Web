"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";

export const useUpdateMessage = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.messages.update),
    });
};