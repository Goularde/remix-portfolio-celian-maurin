import { Form, useFetcher } from "@remix-run/react";
import EditableTag from "./EditableTag";
import { Save } from "lucide-react";
import classNames from "classnames";
import { SerializeFrom } from "@remix-run/node";
import { ProjectType } from "~/types/projectType";

type EditableProjectCardProps = {
  project: SerializeFrom<ProjectType>;
};
const EditableProjectCard = ({ project }: EditableProjectCardProps) => {
  const createTagFetcher = useFetcher();
  const isAdding = createTagFetcher.formData?.get("_action") === "addTag";
  return (
    <div className="flex flex-col p-4 rounded-lg max-w-xs bg-background-light border-2 border-accent justify-between">
      <Form
        method="PUT"
        className="mt-4 flex flex-col gap-2"
        action={`/dashboard/edit/${project.id}`}
        id="updateProjectForm"
        encType="multipart/form-data"
      >
        <input type="hidden" name="projectId" defaultValue={project.id} />
        <div className="flex justify-center">
          <input
            type="file"
            name="projectImage"
            id="projectImage"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const files = event.target.files;
              if (files && files.length > 0) {
                const file = files[0];
                const imgTag = document.getElementById(
                  "projectImageElement"
                ) as HTMLImageElement;
                if (imgTag) {
                  imgTag.src = URL.createObjectURL(file);
                }
              }
            }}
          />
          <label htmlFor="projectImage" className="cursor-pointer">
            <img
              id="projectImageElement"
              src={
                project.image?.fileName
                  ? `/img/${project.image.fileName}`
                  : "https://picsum.photos/300/200"
              }
              alt="projectImage"
              className="rounded-md h-auto w-full"
            />
          </label>
        </div>
        <input
          type="text"
          className="text-xl  w-full bg-transparent"
          name="projectName"
          defaultValue={project.name}
          required
        />

        <textarea
          name="projectDescription"
          rows={7}
          className=" text-gray-400 w-full h-full bg-transparent"
          defaultValue={project.description}
          required
        />

        <div className="flex gap-2 mt-4">
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              className={classNames(
                "p-2 w-8 h-8 rounded-full bg-background-light border-2 border-accent hover:scale-110 leading-3 text-center",
                { "animate-spin": isAdding, disabled: isAdding }
              )}
              onClick={() => {
                createTagFetcher.submit(
                  { _action: "createTag", projectId: project.id },
                  { method: "POST", encType: "multipart/form-data" }
                );
              }}
            >
              +
            </button>
            {project.tags?.map((tag) => (
              <EditableTag
                key={tag.id}
                tagName={tag.name}
                tagColor={tag.color}
                tagId={tag.id}
                projectId={project.id}
              />
            ))}
          </div>
        </div>
      </Form>
      <div className="flex justify-end">
        <button
          type="submit"
          name="_action"
          value="updateProject"
          className="p-2 rounded-full bg-background-light border-2 border-accent hover:scale-110 leading-3 text-center"
          form="updateProjectForm"
        >
          <Save />
        </button>
      </div>
    </div>
  );
};

export default EditableProjectCard;
