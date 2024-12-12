import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createOrGet = mutation({
    args: {
        userId: v.string(),
        memberId: v.id("members"),
        workspaceId: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            throw new Error('Unauthorized');
        }

        const currentMember = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) => 
                q.eq("userId", args.userId).eq("workspaceId", args.workspaceId)   
            )
            .unique();

        const otherMember = await ctx.db.get(args.memberId);
        if (!currentMember || !otherMember) {
            throw new Error('Member not found');
        }

        const existingConversation = await ctx.db
            .query("conversations")
            .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
            .filter((q) => 
                q.or(
                    q.and(
                        q.eq(q.field("memberOneId"), currentMember._id),
                        q.eq(q.field("memberTwoId"), otherMember._id)
                    ),
                    q.and(
                        q.eq(q.field("memberOneId"), otherMember._id),
                        q.eq(q.field("memberTwoId"), currentMember._id)
                    )
                )
            )
            .unique();

        if (existingConversation) {
            return existingConversation._id;
        }

        return await ctx.db.insert("conversations", {
            workspaceId: args.workspaceId,
            memberOneId: currentMember._id,
            memberTwoId: otherMember._id
        });
    }
});