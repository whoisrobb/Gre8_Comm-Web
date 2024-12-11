import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, QueryCtx } from "./_generated/server";

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

export const toggle = mutation({
    args: {
        userId: v.string(),
        messageId: v.id("messages"),
        value: v.string()
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            throw new Error("Unauthorized");
        }

        const message = await ctx.db.get(args.messageId);
        if (!message) {
            throw new Error("Invalid message");
        }

        const member = await getMember(ctx, message.workspaceId, args.userId);
        if (!member || member._id !== message.memberId) {
            throw new Error("Unauthorized");
        }

        const existingMessageReactionFromUser = await ctx.db
            .query("reactions")
            .filter((q) =>
                q.and(
                    q.eq(q.field("messageId"), args.messageId),
                    q.eq(q.field("memberId"), member._id),
                    q.eq(q.field("value"), args.value)
                )
            )
            .first();

        if (existingMessageReactionFromUser) {
            await ctx.db.delete(existingMessageReactionFromUser._id);
            return existingMessageReactionFromUser._id;
        } else {
            const newReactionId = await ctx.db.insert("reactions", {
                value: args.value,
                memberId: member._id,
                messageId: args.messageId,
                workspaceId: message.workspaceId
            });
            
            return newReactionId;
        }
    }
});