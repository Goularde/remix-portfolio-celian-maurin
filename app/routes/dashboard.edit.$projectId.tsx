import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  NodeOnDiskFile,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import EditableProjectCard from "~/components/EditableProject";
import { getProject, updateProject } from "~/models/project.server";
import { createTag, deleteTag } from "~/models/tag.server";
import { formatTags } from "~/utils/misc";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "~/models/image.server";
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        filter({ contentType }) {
          return contentType.includes("image");
        },
        directory: "./public/img",
        maxPartSize: 1024 * 1024 * 10,
        avoidFileConflicts: false,
        file({ filename }) {
          return `${uuidv4()}.${filename.split(".")[1]}`;
        },
      }),
      unstable_createMemoryUploadHandler()
    )
  );

  const file = formData.get("projectImage") as NodeOnDiskFile;
  const tags = formatTags(formData);
  const projectId = formData.get("projectId");
  const projectName = formData.get("projectName");
  const projectDescription = formData.get("projectDescription");

  switch (formData.get("_action")) {
    case "updateProject": {
      if (
        typeof projectId === "string" &&
        typeof projectName === "string" &&
        typeof projectDescription === "string" &&
        tags
      ) {
        if (file && file.size > 0) {
          await uploadImage(file.name, file.getFilePath(), projectId);
        }
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
    <div className="mt-4 flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl">Projet</h1>
      <EditableProjectCard project={project} />
    </div>
  );
};
export default EditProject;
