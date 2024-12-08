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

export const getById = query({
    args: {
        userId: v.string(),
        channelId: v.id("channels")
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            return null;
        }
        
        const channel = await ctx.db.get(args.channelId);

        if (!channel) {
            return null;
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", args.userId).eq("workspaceId", channel.workspaceId)
            )
            .unique();

        if (!member) {
            return null;
        }

        return channel;
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

export const update = mutation({
    args: {
        userId: v.string(),
        channelId: v.id("channels"),
        name: v.string()
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            throw Error("Unauthorized!");
        }

        const channel = await ctx.db.get(args.channelId);

        if (!channel) {
            throw Error("Channel not found!");
        }
        
        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", args.userId).eq("workspaceId", channel.workspaceId)
            )
            .unique();
        
        if (!member || member.role !== "admin") {
            throw new Error("Unauthorized!");
        }

        const parsedName = args.name.replace(/\+/g, "-").toLocaleLowerCase();

        await ctx.db.patch(args.channelId, {
            name: parsedName
        });

        return args.channelId;
    }
});

export const remove = mutation({
    args: {
        userId: v.string(),
        channelId: v.id("channels")
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            throw Error("Unauthorized!");
        }

        const channel = await ctx.db.get(args.channelId);

        if (!channel) {
            throw Error("Channel not found!");
        }
        
        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", args.userId).eq("workspaceId", channel.workspaceId)
            )
            .unique();
        
        if (!member || member.role !== "admin") {
            throw new Error("Unauthorized!");
        }

        // TODO: Delete all messages in the channel

        await ctx.db.delete(args.channelId);

        return args.channelId;
    }
});