"use client";

import { api } from "../../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Loader2, BadgePlus } from "lucide-react";
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
import placeholder from "./placeholder.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(1000),
});

export default function Projects() {
  const { toast } = useToast();
  const user = useUser();
  const organization = useOrganization();
  const [dialogOpen, setDialogOpen] = useState(false);

  let orgId: string | undefined = undefined;

  const me = useQuery(api.users.getMe);

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const projects = useQuery(api.projects.getProjects, {
    orgId: orgId ?? "skip",
  });

  const createProject = useMutation(api.projects.createProject);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!orgId || !me) return;

    try {
      await createProject({
        name: values.name,
        description: values.description,
        orgId: orgId,
        userId: me._id ?? "skip",
        progress: "In Progress",
      });

      form.reset();

      setDialogOpen(false);

      toast({
        variant: "success",
        title: "Project Created",
        description:
          "Congratulations! Your project has been created successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Project Creation Failed",
        description:
          "Your project could not be created, please try again later.",
      });
    }
  }

  return (
    <div>
      <h1 className="text-6xl text-center m-10">Projects</h1>
      <Dialog
        open={dialogOpen}
        onOpenChange={(isOpen) => {
          setDialogOpen(isOpen);
          form.reset();
        }}
      >
        <DialogTrigger asChild>
          <Button variant="cta">
            <BadgePlus className="mr-2" />
            Create Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Project</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Project Name..." {...field} />
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
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your Project Description..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex w-11/12 flex-wrap mx-auto justify-evenly">
        {projects?.map((project) => (
          <div className="basis-1/4 m-4 border border-slate-400 rounded-xl" key={project._id}>
            <div className="grid items-start gap-4">
              <Image
                alt="Placeholder"
                className="aspect-[16/9] rounded-lg object-cover"
                height={225}
                src={project.image ? project.image : placeholder}
                width={400}
              />
              <div className="grid gap-1">
                <h2 className="text-lg font-semibold">{project.name}</h2>
              </div>
              <div className="grid gap-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Project Status: {project.progress ? project.progress : "In Progress"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Task Status: {project.tasks ? project.tasks.length : "No Tasks Yet"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                Started: {new Date(project._creationTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )) ?? (
          <>
            <Loader2 className="w-48 h-48"></Loader2>
            <p>Fetching your projects...</p>
          </>
        )}
      </div>
    </div>
  );
}
