import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import EditableProjectCard from "~/components/EditableProject";
import { getProject, updateProject } from "~/models/project.server";
import { createTag, deleteTag } from "~/models/tag.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log(formData);

  const formatTags = () => {
    const tagIds = formData.getAll("tagId") as string[];
    const tagNames = formData.getAll("tagName") as string[];
    return tagIds.map((id, index) => {
      return {
        id,
        name: tagNames[index],
      };
    });
  };
  const tags = formatTags();
  const projectId = formData.get("projectId");
  const projectName = formData.get("projectName");
  const projectDescription = formData.get("projectDescription");

  switch (formData.get("_action")) {
    case "updateProject": {
      if (
        typeof projectId === "string" &&
        typeof projectName === "string" &&
        typeof projectDescription === "string"
      ) {
        return updateProject(
          projectId,
          projectName,
          projectDescription,
          tags
        ).then(() => redirect(`/dashboard`));
      }
      return json("type error on inputs", { status: 400 });
    }
    case "deleteTag": {
      try {
        const tagId = formData.get("tagId");
        if (typeof tagId === "string") {
          return deleteTag(tagId);
        }
        return json("Tag wasn't deleted", { status: 400 });
      } catch (e) {
        return { error: true };
      }
    }
    case "createTag": {
      if (typeof projectId === "string") {
        return createTag(projectId);
      }
      return json("Tag wasn't created", { status: 400 });
    }
  }
  return json("No _action found", { status: 400 });
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.projectId) {
    return redirect("/dashboard");
  }
  const project = await getProject(params.projectId);
  if (!project) {
    return json("Project not found", { status: 404 });
  }
  return json({ project });
};

const EditProject = () => {
  const data = useLoaderData<typeof loader>();
  if (typeof data === "string") {
    // Handle the case where data is a string (e.g., an error message)
    return <div>Error: {data}</div>;
  }
  const project = data.project;
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-12">
      <h1 className="text-3xl">Projet</h1>
      <EditableProjectCard project={project} />
    </div>
  );
};
export default EditProject;
