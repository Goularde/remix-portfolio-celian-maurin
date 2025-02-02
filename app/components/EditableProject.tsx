import { Form, useFetcher } from "@remix-run/react";
import EditableTag from "./EditableTag";
import { Save } from "lucide-react";
import classNames from "classnames";

type EditableProjectCardProps = {
  project: {
    id: string;
    name: string;
    description: string;
    tags?: { id: string; name: string; color: string }[];
  };
};
const EditableProjectCard = ({ project }: EditableProjectCardProps) => {
  const createTagFetcher = useFetcher();
  const isAdding = createTagFetcher.formData?.get("_action") === "addTag";
  const url = new URL(window.location.href).pathname;
  return (
    <div className="flex flex-col p-4 rounded-lg max-w-xs bg-background-light border-2 border-accent justify-between">
      <div>
        <img
          src="https://picsum.photos/300/200"
          alt="random"
          className="rounded-md"
        />
        <Form
          method="PUT"
          className="mt-4 flex flex-col gap-2"
          action={
            url === "/dashboard/new-project"
              ? "/dashboard/new-project"
              : `/dashboard/${project.id}`
          }
        >
          <input type="hidden" name="projectId" defaultValue={project.id} />
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

          <div className="flex justify-end">
            <button
              type="submit"
              name="_action"
              value={"updateProject"}
              className="p-2 rounded-full bg-background-light border-2 border-accent hover:scale-110 leading-3 text-center"
            >
              <Save />
            </button>
          </div>
        </Form>
      </div>
      <div className="flex gap-2 mt-4">
        {/*  TODO: add a button to add a tag */}
        <div className="flex gap-2 flex-wrap">
          <createTagFetcher.Form
            method="POST"
            action={
              url === "/dashboard/new-project"
                ? "/dashboard/new-project"
                : `/dashboard/${project.id}`
            }
          >
            <input type="hidden" name="projectId" value={project.id} />
            <button
              className={classNames(
                "p-2 w-8 h-8 rounded-full bg-background-light border-2 border-accent hover:scale-110 leading-3 text-center",
                { "animate-spin": isAdding, disabled: isAdding }
              )}
              name="_action"
              value="createTag"
              type="submit"
            >
              +
            </button>
          </createTagFetcher.Form>
          {project.tags?.map((tag) => (
            <EditableTag
              key={tag.id}
              tagName={tag.name}
              color={tag.color}
              id={tag.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditableProjectCard;
