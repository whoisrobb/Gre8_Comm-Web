import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const getMember = async (
    ctx: QueryCtx,
    workspaceId: Id<"workspaces">,
    userId: string
) => {
    return ctx.db
        .query("members")
        .withIndex("by_user_id_workspace_id", (q) =>
            q.eq("userId", userId).eq("workspaceId", workspaceId)
        )
        .unique();
};

export const create = mutation({
    args: {
        userId: v.string(),
        content: v.string(),
        workspaceId: v.id("workspaces"),
        channelId: v.optional(v.id("channels")),
        conversationId: v.optional(v.id("conversations")),
        parentMessageId: v.optional(v.id("messages"))
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            throw Error("Unauthorized!");
        }
        
        const member = await getMember(ctx, args.workspaceId, args.userId);
        
        if (!member) {
            throw new Error("Unauthorized!");
        }

        // If the message is not a reply to another message, it must be a reply to a conversation
        let _conversationId = args.conversationId;
        
        if (!args.conversationId && !args.channelId && args.parentMessageId) {
            const message = await ctx.db.get(args.parentMessageId);

            if (!message) {
                throw new Error("Invalid parent message!");
            }

            _conversationId = message.conversationId;
        }
        
        const messageId = await ctx.db
            .insert("messages", {
                content: args.content,
                memberId: member._id,
                workspaceId: args.workspaceId,
                channelId: args.channelId,
                conversationId: _conversationId,
                parentMessageId: args.parentMessageId,
                updatedAt: Date.now()
            });
        
        return messageId;
    }
})