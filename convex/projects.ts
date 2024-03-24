import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
  },
  async handler(ctx, args) {
    await ctx.db.insert("projects", {
      name: args.name,
      description: args.description,
      image: args.image,
      progress: args.progress,
      orgId: args.orgId,
      userId: args.userId,
      techStack: args.techStack,
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

export const addTask = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    description: v.string(),
    status: v.string(),
    label: v.string(),
    priority: v.string(),
    assignee: v.id("users"),
  },
  async handler(ctx, args) {
    await ctx.db.insert("tasks", {
      projectId: args.projectId,
      title: args.title,
      description: args.description,
      status: args.status,
      label: args.label,
      priority: args.priority,
      assignee: args.assignee,
    });
  },
});

export const getProjectTasks = query({
  args: { projectId: v.string() },
  async handler(ctx, args) {
    const tasks = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .collect();
    return tasks;
  },
});

export const deleteTaskById = mutation({
    args: { _id: v.id("tasks") },
    async handler(ctx, args) {
        await ctx.db.delete(args._id);
    },
});


export const updateTask = mutation({
    args: {
        _id: v.id("tasks"),
        title: v.string(),
        description: v.string(),
        status: v.string(),
        label: v.string(),
        priority: v.string(),
        assignee: v.id("users"),
    },
    async handler(ctx, args) {
        await ctx.db.patch(args._id, {
            title: args.title,
            description: args.description,
            status: args.status,
            label: args.label,
            priority: args.priority,
            assignee: args.assignee,
        });
    },
});