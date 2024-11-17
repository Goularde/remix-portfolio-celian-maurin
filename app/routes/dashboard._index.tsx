import { ActionFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  Link,
  redirect,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { Pencil, Plus, Trash2Icon } from "lucide-react";
import ProjectCard from "~/components/ProjectCard";
import {
  createProject,
  deleteProject,
  getAllProjects,
} from "~/models/project.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const projectId = formData.get("projectId");
  switch (formData.get("_action")) {
    case "deleteProject": {
      if (typeof projectId === "string") {
        return deleteProject(projectId);
      }
      return json("Project wasn't deleted", { status: 400 });
    }
    case "addProject": {
      // TODO: add a notification
      const newProject = await createProject();
      return redirect(`/dashboard/edit/${newProject.id}`);
    }
  }
  return json("No action found", { status: 400 });
};
export const loader = async () => {
  const projects = await getAllProjects();
  return json({ projects });
};

export default function DashboardIndex() {
  const data = useLoaderData<typeof loader>();
  const deleteProjectFetcher = useFetcher();
  const isDeletingProject =
    deleteProjectFetcher.formData?.get("_action") === "deleteProject";
  const deletingProjectId = deleteProjectFetcher.formData?.get("projectId");

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl">Bienvenue sur le Portfolio de Goularde</h1>
      <div className="grid md:grid-cols-4 gap-8 p-12">
        <div className="justify-self-center self-center bg-background-light rounded-full">
          <Form method="post">
            <button type="submit" name="_action" value="addProject">
              <Plus
                className="hover:scale-105 border rounded-full p-2 border-accent"
                size={120}
                fill="white"
              />
            </button>
          </Form>
        </div>
        {data.projects.map((project) => {
          return (
            <div key={project.id}>
              <ProjectCard
                name={project.name}
                description={project.description}
                tags={project.tags}
                style={
                  isDeletingProject && project.id === deletingProjectId
                    ? { opacity: 0.25 }
                    : { opacity: 1 }
                }
              >
                <div className="flex justify-end gap-2">
                  <Link to={`edit/${project.id}`} className="mb-4">
                    <Pencil className="hover:scale-110" size={20} />
                  </Link>

                  <deleteProjectFetcher.Form method="DELETE">
                    <button name="_action" value="deleteProject">
                      <input
                        type="hidden"
                        value={project.id}
                        name="projectId"
                      />
                      <Trash2Icon
                        className="hover:scale-110 hover:text-red-500"
                        size={20}
                      />
                    </button>
                  </deleteProjectFetcher.Form>
                </div>
              </ProjectCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
