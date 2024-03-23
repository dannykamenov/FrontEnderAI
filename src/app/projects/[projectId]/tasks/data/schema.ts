import { z } from "zod"

export const taskSchema = z.object({
  assignee: z.string(),
  description: z.string(),
  label: z.string(),
  priority: z.string(),
  projectId: z.string(),
  status: z.string(),
  title: z.string(),
  _creationTime: z.number(),
  _id: z.string(),
})

export type Task = z.infer<typeof taskSchema>
