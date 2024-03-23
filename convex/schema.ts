import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    orgIds: v.array(
      v.object({
        orgId: v.string(),
        role: roles,
      })
    ),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
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

