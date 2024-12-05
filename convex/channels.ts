import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
    args: {
        userId: v.string(),
        workspaceId: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            return []
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", args.userId).eq("workspaceId", args.workspaceId)
            )
            .unique();

        if (!member) {
            return [];
        }

        const channels = await ctx.db
            .query("channels")
            .withIndex("by_workspace_id", (q) =>
                q.eq("workspaceId", args.workspaceId),
            )
            .collect();
        
        return channels;
    }
})