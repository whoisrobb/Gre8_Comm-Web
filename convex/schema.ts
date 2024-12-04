import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    workspaces: defineTable({
        name: v.string(),
        userId: v.string()
    })
});

export default schema;
