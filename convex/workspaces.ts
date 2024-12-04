import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "@clerk/nextjs/server";

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

        return workspaceId;
    }
});

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("workspaces").collect(); 
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