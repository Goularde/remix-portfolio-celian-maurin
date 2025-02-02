import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/react";
import { getProject, updateProject } from "~/models/project.server";
import { createTag, deleteTag } from "~/models/tag.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.projectId) {
    return redirect("/dashboard");
  }
  const project = await getProject(params.projectId);
  return json({ project });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
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
        return updateProject(projectId, projectName, projectDescription).then(
          () => redirect(`/dashboard`)
        );
      }
      return json(null);
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

const UpdateProject = () => {
  return null;
};
export default UpdateProject;
