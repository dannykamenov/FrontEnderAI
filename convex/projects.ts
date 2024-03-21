import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  internalMutation,
  mutation,
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

export const createProject = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    image: v.optional(v.string()),
    orgId: v.string(),
    userId: v.id("users"),
    progress: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
    tasks: v.optional(
      v.array(
        v.object({
          name: v.string(),
          description: v.string(),
          completed: v.boolean(),
        })
      )
    ),
  },
  async handler(ctx, args) {
    await ctx.db.insert("projects", {
      name: args.name,
      description: args.description,
      image: args.image,
      progress: args.progress,
      orgId: args.orgId,
      userId: args.userId,
      tasks: args.tasks,
    });
  },
});

export const getProjectById = query({
  args: { _id: v.string() },
  async handler(ctx, args) {
    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("_id"), args._id))
      .first();
    if (!project) {
      throw new ConvexError("expected project to be defined");
    }
    return project;
  },
});

export const updateProject = mutation({
  args: {
    _id: v.id("projects"),
    name: v.string(),
    description: v.string(),
    techStack: v.optional(v.array(v.string())),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args._id, {
      name: args.name,
      description: args.description,
      techStack: args.techStack,
    });
  },
});
