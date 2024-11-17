import { useFetcher } from "@remix-run/react";
import classNames from "classnames";
import { RotateCcw, X } from "lucide-react";
import { useEffect } from "react";

type EditableTagProps = {
  tagName: string;
  color?: string;
  tagId: string;
  projectId: string;
};

const EditableTag = ({
  tagName,
  color,
  tagId,
  projectId,
}: EditableTagProps) => {
  const deleteTagFetcher = useFetcher();

  const isDeleteting =
    deleteTagFetcher.formData?.get("_action") === "deleteTag";
  const fetcherData = deleteTagFetcher.data as { error: boolean };
  const isFailedDeletion = fetcherData?.error;
  useEffect(() => {
    // console.log(deleteTagFetcher.load(`/dashboard/edit/${projectId}`));
  }, [deleteTagFetcher.data, projectId]);
  return (
    <div
      className={classNames(
        "p-2 pr-3 rounded-full bg-background-light border-2 border-accent flex items-center justify-center gap-1 hover:scale-110"
      )}
      style={{ display: isDeleteting ? "none" : "flex" }}
    >
      <span
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />

      <input type="hidden" name="tagId" value={tagId} />
      <input
        required
        type="text"
        name="tagName"
        className="text-xs leading-3 bg-transparent max-w-16  outline-2 outline-primary"
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
