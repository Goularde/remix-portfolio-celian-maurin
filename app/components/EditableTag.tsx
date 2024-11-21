import { useFetcher } from "@remix-run/react";
import classNames from "classnames";
import { RotateCcw, X } from "lucide-react";

type EditableTagProps = {
  tagName: string;
  tagColor?: string;
  tagId: string;
  projectId: string;
};

const EditableTag = ({
  tagName,
  tagColor,
  tagId,
  projectId,
}: EditableTagProps) => {
  const deleteTagFetcher = useFetcher();

  const isDeleteting =
    deleteTagFetcher.formData?.get("_action") === "deleteTag";
  const fetcherData = deleteTagFetcher.data as { error: boolean };
  const isFailedDeletion = fetcherData?.error;

  return (
    <div
      className={classNames(
        "p-2 pr-3 rounded-full bg-background-light border-2 border-accent flex items-center justify-center gap-1 hover:scale-110"
      )}
      style={{ display: isDeleteting ? "none" : "flex" }}
    >
      <input
        required
        type="color"
        defaultValue={tagColor ? tagColor : "#7c3aed"}
        className="cursor-pointer p-0 border-0 outline-none background-transparent border-cyan-500 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0 w-3 h-3"
        name="tagColor"
      />

      <input type="hidden" name="tagId" value={tagId} />
      <input
        required
        type="text"
        name="tagName"
        className="text-xs leading-3 bg-transparent max-w-16 focus:outline-none focus:border-accent focus:border-2 border-2 border-transparent rounded"
        defaultValue={tagName}
      />
      <button
        type="button"
        onClick={() =>
          deleteTagFetcher.submit(
            { _action: "deleteTag", tagId },
            {
              method: "delete",
              action: `/dashboard/edit/${projectId}`,
            }
          )
        }
      >
        {isFailedDeletion ? <RotateCcw size={12} /> : <X size={12} />}
      </button>
    </div>
  );
};

export default EditableTag;
