import { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import EditableProjectCard from "~/components/EditableProject";
import { createProject, getProject } from "~/models/project.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.projectId) {
    const newProject = await createProject("New Project", "Description");
    if (!newProject) {
      throw new Response("Can't create new project", { status: 400 });
    }
    return redirect(`/dashboard/${newProject.id}`);
  } else {
    const projectId = params.projectId;
    const project = await getProject(projectId);
    if (!project) {
      throw new Response("Project not found", { status: 404 });
    }
    return json(project);
  }
};

export default function ProjectForm() {
  const project = useLoaderData<typeof loader>();
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-12">
      <h1 className="text-3xl">Projet</h1>
      <EditableProjectCard project={project} />
    </div>
  );
}
