import { useFetcher } from "@remix-run/react";
import classNames from "classnames";
import { RotateCcw, X } from "lucide-react";

type EditableTagProps = {
  tagName: string;
  color: string;
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
      <deleteTagFetcher.Form
        method="DELETE"
        action={`/dashboard/${projectId}`}
        aria-label={isFailedDeletion ? "Retry" : "Delete"}
        onSubmit={(e) => {
          if (!confirm("Are you sure you want to delete this shelf?")) {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="tagId" value={tagId} />
        <button type="submit" name="_action" value="deleteTag">
          {isFailedDeletion ? <RotateCcw size={12} /> : <X size={12} />}
        </button>
      </deleteTagFetcher.Form>
    </div>
  );
};

export default EditableTag;
