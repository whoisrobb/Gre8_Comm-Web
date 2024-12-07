import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    users: defineTable({
        userId: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        image: v.string()
    })
        .index("by_user_id", ["userId"]),
    workspaces: defineTable({
        name: v.string(),
        joinCode: v.string(),
        userId: v.string()
    }),
    members: defineTable({
        userId: v.string(),
        workspaceId: v.id("workspaces"),
        role: v.union(v.literal("admin"), v.literal("member"))
    })
        .index("by_user_id", ["userId"])
        .index("by_workspace_id", ["workspaceId"])
        .index("by_user_id_workspace_id", ["userId", "workspaceId"]),
    channels: defineTable({
        name: v.string(),
        workspaceId: v.id("workspaces")
    })
        .index("by_workspace_id", ["workspaceId"])
});

export default schema;
