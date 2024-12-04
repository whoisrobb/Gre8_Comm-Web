import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        name: v.string(),
        userId: v.string()
    },
    handler: async (ctx, args) => {  

        const workspaceId = await ctx.db.insert("workspaces", {
            name: args.name,
            userId: args.userId
        });

        await ctx.db.insert("members", {
            userId: args.userId,
            workspaceId,
            role: "admin"
        });

        return workspaceId;
    }
});

export const get = query({
    args: {
        userId: v.string()
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            return []
        };

        const members = await ctx.db
            .query("members")
            .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
            .collect();

        const workspaceIds = members.map((member) => member.workspaceId);
        const workspaces = [];

        for (const workspaceId of workspaceIds) {
            const workspace = await ctx.db.get(workspaceId);

            if (workspace) {
                workspaces.push(workspace);
            }
        };

        return workspaces; 
    }
});

export const getById = query({
    args: {
        workspaceId: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.workspaceId);
    }
})