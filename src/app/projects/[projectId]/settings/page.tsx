"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { frontEndIcons, backEndIcons } from "./icons";
import { useOrganization, useUser } from "@clerk/nextjs";

const profileFormSchema = z.object({
  name: z.string().optional(),
  bio: z
    .string()
    .optional(),
  frontEnd: z.string().optional(),
  backEnd: z.string().optional(),
  auth: z.string().optional(),
  db: z.string().optional(),
});
/*   .refine((data) => {
    const { frontEnd, backEnd, auth, db } = data;
    const isAnySelected = frontEnd || backEnd || auth || db;
    const isAllSelected = frontEnd && backEnd && auth && db;
    return !isAnySelected || isAllSelected;
  }, "If frontEnd, backEnd, auth, or db are selected, all fields are required."); */

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProjectSettings(props: {
  params: { projectId: string };
}) {
  const getProject = useQuery(api.projects.getProjectById, {
    _id: props.params.projectId,
  });

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      bio: "",
      frontEnd: "",
      backEnd: "",
      auth: "",
      db: "",
    },
    mode: "onChange",
  });

  const { toast } = useToast();

  const updateCurrent = useMutation(api.projects.updateProject);
  const user = useUser();
  const organization = useOrganization();

  let orgId: string | undefined = undefined;
  
  const me = useQuery(api.users.getMe);

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const projects = useQuery(api.projects.getProjects, {
    orgId: orgId ?? "skip",
  });

  function onSubmit(data: ProfileFormValues) {

    
    if (!orgId || !me) {
        return;
      }

    if (!getProject) return;

    if (!getProject.techStack) {
      getProject.techStack = ["", "", "", ""];
    }

    try {
      updateCurrent({
        _id: getProject?._id,
        name: data.name ? data.name : getProject?.name,
        description: data.bio ? data.bio : getProject?.description,
        techStack: [
          data.frontEnd || getProject?.techStack[0],
          data.backEnd || getProject?.techStack[1],
          data.auth || getProject?.techStack[2],
          data.db || getProject?.techStack[3],
        ],
      });

      form.reset({
        name: "",
        bio: "",
        frontEnd: "",
        backEnd: "",
        auth: "",
        db: "",
      });

      toast({
        variant: "success",
        title: "Project Updated",
        description: "Your project has been updated successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again later.",
      });
    }
  }

  return (
    <>
      {getProject === undefined && (
        <div className="w-fit h-fit flex m-auto flex-col items-center mb-48 mt-36">
          <Loader2 className="w-48 h-48 animate-spin"></Loader2>
          <p>Fetching your project info...</p>
        </div>
      )}
      {getProject !== undefined && getProject._id && (
        <div className="m-6 w-fit">
          <h1 className="text-4xl font-bold mb-6">Project Settings</h1>
          <Separator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder={getProject.name} {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of your project. It will be displayed in
                      the project list and on your project page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={getProject.description}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h1 className="text-2xl font-bold">Choose Tech Stack</h1>
              <div>
                <p>Current: </p>{" "}
                {getProject.techStack ? (
                  <div className="flex space-x-2 items-center">
                    {getProject.techStack.map((tech, i) => {
                      if (tech === "") {
                        return (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-transparent"
                          >
                            None
                          </Badge>
                        );
                      }
                      if (i === 0) {
                        return (
                          <div key={i}>
                            {frontEndIcons[tech as keyof typeof frontEndIcons]}
                          </div>
                        );
                      }
                      if (i === 1) {
                        return (
                          <div key={i}>
                            {backEndIcons[tech as keyof typeof backEndIcons]}
                          </div>
                        );
                      }
                      if (i === 2) {
                        if (tech === "nextauth") {
                          return (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-transparent"
                            >
                              {tech.toUpperCase()}
                            </Badge>
                          );
                        } else {
                          return (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-transparent"
                            >
                              {tech.toUpperCase()} AUTH
                            </Badge>
                          );
                        }
                      }
                      if (i === 3) {
                        return (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-transparent"
                          >
                            {tech.toUpperCase()}
                          </Badge>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <p>No tech stack chosen yet.</p>
                )}{" "}
              </div>
              <Separator />
              <FormDescription>
                If you want to change your tech stack, please select all fields.
              </FormDescription>
              <FormField
                control={form.control}
                name="frontEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Front-End</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select A Front-End Framework" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="react">
                          <i className="devicon-react-original colored mr-3 "></i>
                          React
                        </SelectItem>
                        <SelectItem value="javascript">
                          <i className="devicon-javascript-plain colored mr-3"></i>
                          JavaScript
                        </SelectItem>
                        <SelectItem value="angular">
                          <i className="devicon-angularjs-plain colored mr-3"></i>
                          Angular
                        </SelectItem>
                        <SelectItem value="vue">
                          <i className="devicon-vuejs-plain colored mr-3"></i>
                          Vue
                        </SelectItem>
                        <SelectItem value="svelte">
                          <i className="devicon-svelte-plain colored mr-3"></i>
                          Svelte
                        </SelectItem>
                        <SelectItem value="flutter">
                          <i className="devicon-flutter-plain colored mr-3"></i>
                          Flutter
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="backEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Back-End</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your Back-End Of Choice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="expressjs">
                          <i className="devicon-express-original mr-3"></i>
                          ExpressJS
                        </SelectItem>
                        <SelectItem value="nextjs">
                          <i className="devicon-nextjs-original-wordmark mr-3"></i>
                          NextJS
                        </SelectItem>
                        <SelectItem value="nodejs">
                          <i className="devicon-nodejs-plain-wordmark colored mr-3"></i>
                          Node.js
                        </SelectItem>
                        <SelectItem value="sveltekit">
                          <i className="devicon-svelte-plain-wordmark colored mr-3"></i>
                          SvelteKit
                        </SelectItem>
                        <SelectItem value="nuxt">
                          <i className="devicon-nuxtjs-plain colored mr-3"></i>
                          Nuxt
                        </SelectItem>
                        <SelectItem value="java">
                          <i className="devicon-java-plain colored mr-3"></i>
                          Java
                        </SelectItem>
                        <SelectItem value="python">
                          <i className="devicon-python-plain colored mr-3"></i>
                          Python
                        </SelectItem>
                        <SelectItem value="ruby">
                          <i className="devicon-ruby-plain colored mr-3"></i>
                          Ruby
                        </SelectItem>
                        <SelectItem value="go">
                          <i className="devicon-go-original-wordmark colored mr-3"></i>
                          Go
                        </SelectItem>
                        <SelectItem value="django">
                          <i className="devicon-django-plain colored mr-3"></i>
                          Django
                        </SelectItem>
                        <SelectItem value="rust">
                          <i className="devicon-rust-original mr-3"></i>
                          Rust
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="auth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Auth Provider</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your Preferred Auth Provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="clerk">Clerk</SelectItem>
                        <SelectItem value="nextauth">NextAuth</SelectItem>
                        <SelectItem value="supabase">Supabase</SelectItem>
                        <SelectItem value="firebase">Firebase</SelectItem>
                        <SelectItem value="kinde">Kinde</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="db"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred ORM</FormLabel>
                    <Input
                      placeholder="Click To Choose!"
                      value={field.value}
                      onChange={field.onChange}
                      list="orm"
                    />
                    <datalist id="orm" className="w-full">
                      <option value="Convex" />
                      <option value="MongoDB" />
                      <option value="Supabase" />
                      <option value="Firebase" />
                      <option value="Drizzle" />
                      <option value="Prisma" />
                    </datalist>
                    <FormDescription>
                      If your preferred ORM isn&apos;t listed, please input it
                      manually.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update Project</Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
