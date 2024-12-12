import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { Id, Doc } from "./_generated/dataModel";
import { paginationOptsValidator } from "convex/server";

const populateUser = async (ctx: QueryCtx, userId: string) => {
    return ctx.db.query("users")
        .withIndex("by_user_id", (q) =>
            q.eq("userId", userId)
        )
        .unique();
};

const populateMember = async (ctx: QueryCtx, memberId: Id<"members">) => {
    return ctx.db.get(memberId);
};

const populateReactions = async (ctx: QueryCtx, messageId: Id<"messages">) => {
    return ctx.db.query("reactions")
        .withIndex("by_message_id", (q) =>
            q.eq("messageId", messageId)
        )
        .collect();
};

const populateThread = async (ctx: QueryCtx, messageId: Id<"messages">) => {
    const messages = await ctx.db.query("messages")
        .withIndex("by_parent_message_id", (q) =>
            q.eq("parentMessageId", messageId)
        )
        .collect();
    
    if (messages.length === 0) {
        return {
            count: 0,
            timestamp: 0
        };
    }

    const lastMessage = messages[messages.length - 1];
    const lastMessageMember = await populateMember(ctx, lastMessage.memberId);

    if (!lastMessageMember) {
        return {
            count: messages.length,
            timestamp: 0
        };
    }

    const lastMessageUser = await populateUser(ctx, lastMessageMember.userId);

    return {
        count: messages.length,
        timestamp: lastMessage._creationTime,
        user: lastMessageUser
    };
};

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

export const update = mutation({
    args: {
        userId: v.string(),
        messageId: v.id("messages"),
        content: v.string()
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            throw Error("Unauthorized!");
        }

        const message = await ctx.db.get(args.messageId);

        if (!message) {
            throw new Error("Invalid message!");
        }

        const member = await getMember(ctx, message.workspaceId, args.userId);

        if (!member || member._id !== message.memberId) {
            throw new Error("Unauthorized!");
        }

        await ctx.db.patch(args.messageId, {
            content: args.content,
            updatedAt: Date.now()
        });

        return args.messageId;
    }
});

export const get = query({
    args: {
        userId: v.string(),
        channelId: v.optional(v.id("channels")),
        conversationId: v.optional(v.id("conversations")),
        parentMessageId: v.optional(v.id("messages")),
        // paginationOpts: paginationOptsValidator
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            return [];
        }
        
        let _conversationId = args.conversationId;

        // If the message is not a reply to another message, it must be a reply to a conversation
        if (!args.conversationId && !args.channelId && args.parentMessageId) {
            const message = await ctx.db.get(args.parentMessageId);

            if (!message) {
                throw new Error("Invalid parent message!");
            }

            _conversationId = message.conversationId;
        }

        const results = await ctx.db.query("messages")
            .withIndex("by_channel_id_parent_message_id_conversation_id", (q) =>
                q
                    .eq("channelId", args.channelId)
                    .eq("parentMessageId", args.parentMessageId)
                    .eq("conversationId", _conversationId)
            )
            .order("desc")
            .collect();
            // .paginate(args.paginationOpts);

        return {
            page: (
                await Promise.all(
                    results.map(async (message) => {
                        const member = await populateMember(ctx, message.memberId);
                        const user = member ? await populateUser(ctx, member.userId) : null;

                        if (!user) {
                            return null;
                        }

                        const reactions = await populateReactions(ctx, message._id);
                        const thread = await populateThread(ctx, message._id);

                        const reactionsWithCount = reactions.map((reaction) => {
                            return {
                                ...reaction,
                                count: reactions.filter((r) => r.value === reaction.value).length
                            };
                        });

                        const dedupedReactions = reactionsWithCount.reduce(
                            (acc, reaction) => {
                                const existingReaction = acc.find(
                                    (r) => r.value === reaction.value
                                );

                                if (existingReaction) {
                                    existingReaction.memberIds = Array.from(
                                        new Set([
                                            ...existingReaction.memberIds,
                                            reaction.memberId
                                        ])
                                    );
                                } else {
                                    acc.push({ ...reaction, memberIds: [reaction.memberId] });
                                }

                                return acc;
                            },
                            [] as (Doc<"reactions"> & {
                                count: number;
                                memberIds: Id<"members">[];
                            })[]
                        );

                        const reactionWithoutMemberIdProp = dedupedReactions.map(
                            (reaction) => ({
                                ...reaction,
                                memberId: reaction.memberIds[0] // Assuming the first memberId is used
                            })
                        );

                        return {
                            ...message,
                            member,
                            user,
                            reactions: reactionWithoutMemberIdProp,
                            threadCount: thread.count,
                            threadTimestamp: thread.timestamp
                        };
                    })
                )
            ).filter(
                (message) => message !== null
            )
        };
    }
});

export const getById = query({
    args: {
        userId: v.string(),
        messageId: v.id("messages")
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            return null;
        }

        const message = await ctx.db.get(args.messageId);
        if (!message) {
            return null;
        }

        const currentMember = await getMember(ctx, message.workspaceId, args.userId);
        if (!currentMember) {
            return null;
        }

        const member = await populateMember(ctx, message.memberId);
        if (!member) {
            return null;
        }
        
        const user = member ? await populateUser(ctx, member.userId) : null;
        if (!user) {
            return null;
        }

        const reactions = await populateReactions(ctx, message._id);
        const thread = await populateThread(ctx, message._id);

        const reactionsWithCount = reactions.map((reaction) => {
            return {
                ...reaction,
                count: reactions.filter((r) => r.value === reaction.value).length
            };
        });

        const dedupedReactions = reactionsWithCount.reduce(
            (acc, reaction) => {
                const existingReaction = acc.find(
                    (r) => r.value === reaction.value
                );

                if (existingReaction) {
                    existingReaction.memberIds = Array.from(
                        new Set([
                            ...existingReaction.memberIds,
                            reaction.memberId
                        ])
                    );
                } else {
                    acc.push({ ...reaction, memberIds: [reaction.memberId] });
                }

                return acc;
            },
            [] as (Doc<"reactions"> & {
                count: number;
                memberIds: Id<"members">[];
            })[]
        );

        const reactionWithoutMemberIdProp = dedupedReactions.map(
            (reaction) => ({
                ...reaction,
                memberId: reaction.memberIds[0] // Assuming the first memberId is used
            })
        );

        return {
            ...message,
            user,
            member,
            reactions: reactionWithoutMemberIdProp,
            threadCount: thread.count,
        };
    }
});

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
            });
        
        return messageId;
    }
});

export const remove = mutation({
    args: {
        userId: v.string(),
        messageId: v.id("messages")
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            throw Error("Unauthorized!");
        }

        const message = await ctx.db.get(args.messageId);

        if (!message) {
            throw new Error("Invalid message!");
        }

        const member = await getMember(ctx, message.workspaceId, args.userId);

        if (!member || member._id !== message.memberId) {
            throw new Error("Unauthorized!");
        }

        await ctx.db.delete(args.messageId);

        return args.messageId;
    }
});