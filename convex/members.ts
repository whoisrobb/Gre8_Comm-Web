import { v } from "convex/values";
import { query, QueryCtx } from "./_generated/server";

const populateUser = (ctx: QueryCtx, userId: string) => {
    return ctx.db
        .query("users")
        .withIndex("by_user_id", (q) =>
            q.eq("userId", userId)
        )
        .unique();
}

export const get = query({
    args: {
        userId: v.string(),
        workspaceId: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            return [];
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

        const data = await ctx.db
            .query("members")
            .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
            .collect();

        const members = [];

        for (const member of data) {
            const user = await populateUser(ctx, member.userId);

            if (user) {
                members.push({
                    ...member,
                    user
                })
            }
        }
        
        return members;
    }
});

export const getById = query({
    args: {
        userId: v.string(),
        memberId: v.id("members")
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            return null;
        }
        
        const member = await ctx.db.get(args.memberId);
        if (!member) {
            return null;
        }

        const currentMember = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", args.userId).eq("workspaceId", member.workspaceId)
            )
            .unique();
        if (!currentMember) {
            return null;
        }

        const user = await populateUser(ctx, member.userId);
        if (!user) {
            return null;
        }

        return {
            ...member,
            user
        };
    }
});

export const current = query({
    args: {
        userId: v.string(),
        workspaceId: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            return null;
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", args.userId).eq("workspaceId", args.workspaceId)
            )
            .unique();

        if (!member) {
            return null;
        }

        return member;
    }
});