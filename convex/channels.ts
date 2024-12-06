import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        workspaceId: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            throw Error("Unauthorized!");
        }
        
        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", args.userId).eq("workspaceId", args.workspaceId)
            )
            .unique();
        
        if (!member || member.role !== "admin") {
            throw new Error("Unauthorized!");
        }

        const parsedName = args.name.replace(/\+/g, "-").toLocaleLowerCase();

        const channelId = await ctx.db
            .insert("channels", {
                name: parsedName,
                workspaceId: args.workspaceId
            });

        return channelId;
    }
});

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
});