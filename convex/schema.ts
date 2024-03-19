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
    tasks: v.optional(
      v.array(
        v.object({
          name: v.string(),
          description: v.string(),
          completed: v.boolean(),
        })
      )
    ),
  }).index("by_orgId_userId", ["orgId", "userId"]),
});
