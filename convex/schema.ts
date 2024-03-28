import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    userId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    customer_id: v.optional(v.string()),
    active_subscription: v.optional(v.boolean()),
    sub_id: v.optional(v.string()),
    ends_on: v.optional(v.number()),
    sub_status: v.optional(v.string()),
    orgIds: v.array(
      v.object({
        orgId: v.string(),
        role: roles,
      })
    ),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_userId", ["userId"])
    .index("by_sub_id", ["sub_id"]),
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    image: v.optional(v.string()),
    orgId: v.string(),
    userId: v.id("users"),
    progress: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
  }).index("by_orgId_userId", ["orgId", "userId"]),
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.string(),
    label: v.string(),
    priority: v.string(),
    assignee: v.id("users"),
    projectId: v.id("projects"),
  }).index("by_assignee", ["assignee"]),
});
