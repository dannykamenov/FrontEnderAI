"use client";

import { api } from "../../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Loader2, BadgePlus, Search } from "lucide-react";
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
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@radix-ui/react-select";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(1000),
  frontend: z.string(),
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

    console.log(values);

 /*    try {
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
    } */
  }

  return (
    <div>
      <h1 className="text-6xl text-center m-10">Projects</h1>
      <div className="w-5/12 mx-auto flex">
        <div className="flex items-center rounded-lg w-full mr-4 relative">
          <Input className="mr-4" placeholder="Search..." />
          <Search className="w-6 h-6 text-black mr-4 absolute right-3" />
        </div>
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
              <Form {...form} >
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
                          <Input
                            placeholder="Your Project Name..."
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
      </div>
      <div className="flex w-10/12 flex-wrap mx-auto justify-evenly mt-8">
        {projects?.map((project) => (
          <Link
            href={`/projects/${project._id}`}
            key={project._id}
            className="basis-1/3 relative hover:scale-105 hover:transition-all"
          >
            <div className="m-4 border border-black rounded-lg bg-slate-100 relative">
              <div className="grid items-start gap-4">
                <Image
                  alt="Project Image"
                  className="aspect-[16/9] rounded-lg object-cover"
                  height={225}
                  src={project.image ? project.image : "/placeholder.png"}
                  width={400}
                />
                <div className="grid gap-1 break-words text-wrap overflow-auto whitespace-pre-wrap">
                  <h2 className="text-lg font-semibold break-words text-wrap overflow-auto whitespace-pre-wrap px-3 text-black">
                    {project.name}
                  </h2>
                </div>
                <div className="flex items-center absolute top-3 right-3">
                  {project.progress ? (
                    project.progress == "Building" ? (
                      <Badge variant="default">Building</Badge>
                    ) : project.progress == "Completed" ? (
                      <Badge variant="success">Completed</Badge>
                    ) : (
                      <Badge variant="cta">In Progress</Badge>
                    )
                  ) : (
                    <Badge variant="cta">In Progress</Badge>
                  )}
                </div>
                <div className="grid gap-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 px-3">
                    Task Status:{" "}
                    {project.tasks ? (
                      <span className="text-base text-green-500">
                        {project.tasks.length}
                      </span>
                    ) : (
                      <span className="text-base text-red-500">
                        No Tasks Yet
                      </span>
                    )}
                  </p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 px-3 pb-4">
                    Started:{" "}
                    {new Date(project._creationTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )) ?? (
          <div className="w-full h-full flex m-auto flex-col items-center mb-48 mt-36">
            <Loader2 className="w-48 h-48 animate-spin"></Loader2>
            <p>Fetching your projects...</p>
          </div>
        )}
      </div>
    </div>
  );
}
