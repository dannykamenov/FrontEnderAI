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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

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
      });

      form.reset();

      setDialogOpen(false);

      toast({
        variant: "success",
        title: "Project Created",
        description: "Your project has been created",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Project Creation Failed",
        description: "Your project could not be created",
      });
    }
  }

  return (
    <div>
      <h1>Projects</h1>
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
      {projects?.map((project) => (
        <div key={project._id}>
          <p>{project.name}</p>
          <p>{project.description}</p>
          <p>{project.userId}</p>
        </div>
      )) ?? (
        <>
          <Loader2 className="w-48 h-48"></Loader2>
          <p>Fetching your projects...</p>
        </>
      )}
    </div>
  );
}
