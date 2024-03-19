import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  internalMutation,
  query,
} from "./_generated/server";

export const getProjects = query({
  args: { orgId: v.string() },
  async handler(ctx, args) {
    const projects = await ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("orgId"), args.orgId))
        .collect();
    return projects;
  },
});
