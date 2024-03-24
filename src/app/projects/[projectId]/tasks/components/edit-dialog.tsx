"use client";

import { api } from "../../../../../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  BadgePlus,
  Search,
  Bug,
  BookText,
  CircleCheck,
  NotebookPen,
} from "lucide-react";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { Task } from "../data/schema";

const formSchema = z.object({
  title: z.string().min(3).max(50).optional(),
  description: z.string().min(3).max(1000).optional(),
  status: z.string().min(3).max(50).optional(),
  priority: z.string().min(3).max(50).optional(),
  label: z.string().min(3).max(50).optional(),
});

export default function EditTask(props: { task: Task }) {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const me = useQuery(api.users.getMe);
  const updateTask = useMutation(api.projects.updateTask);
  const getProject = useQuery(api.projects.getProjectById, {
    _id: props.task.projectId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      label: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!me || !getProject) {
      return;
    }

    try {
/*       await createTask({
        projectId: getProject._id,
        title: values.title,
        description: values.description,
        status: values.status,
        label: values.label,
        priority: values.priority,
        assignee: me._id,
      }); */

      form.reset();

      setDialogOpen(false);

      toast({
        variant: "success",
        title: "Task Created",
        description:
          "Congratulations! Your task has been created successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Task Creation Failed",
        description: "Your task could not be created, please try again later.",
      });
    }
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(isOpen) => {
        setDialogOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="cta" className="w-full">
          <NotebookPen  className="w-4 h-4 mr-3" />
          Edit 
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white">Edit Task</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 text-white"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What is your task about?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your task..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Label</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Task Label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bug" className="flex items-center">
                          <div className="flex items-center">
                            <Bug className="mr-3 w-4 h-4" /> Bug
                          </div>
                        </SelectItem>
                        <SelectItem value="feature">
                          <div className="flex items-center">
                            <CircleCheck className="mr-3 w-4 h-4" />
                            Feature
                          </div>
                        </SelectItem>
                        <SelectItem value="documentation">
                          <div className="flex items-center">
                            <BookText className="mr-3 w-4 h-4" />
                            Documentation
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Task Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="backlog">
                          <div className="flex items-center">
                            <QuestionMarkCircledIcon className="mr-3" />
                            Backlog
                          </div>
                        </SelectItem>
                        <SelectItem value="todo">
                          <div className="flex items-center">
                            <CircleIcon className="mr-3" />
                            To Do
                          </div>
                        </SelectItem>
                        <SelectItem value="in progress">
                          <div className="flex items-center">
                            <StopwatchIcon className="mr-3" />
                            In Progress
                          </div>
                        </SelectItem>
                        <SelectItem value="done">
                          <div className="flex items-center">
                            <CheckCircledIcon className="mr-3" />
                            Done
                          </div>
                        </SelectItem>
                        <SelectItem value="canceled">
                          <div className="flex items-center">
                            <CrossCircledIcon className="mr-3" />
                            Canceled
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Task Priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center">
                            <ArrowDownIcon className="mr-3" />
                            Low
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center">
                            <ArrowRightIcon className="mr-3" />
                            Medium
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center">
                            <ArrowUpIcon className="mr-3" />
                            High
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full text-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}