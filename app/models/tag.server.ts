import db from "~/db.server";

export const createTag = async (projectId: string) => {
  return db.tag.create({
    data: {
      name: "Tag Name",
      color: "#7c3aed",
      projects: {
        connect: {
          id: projectId,
        },
      },
    },
  });
};
export const updateTag = async (
  tagId: string,
  tagName: string,
  tagColor: string
) => {
  return db.tag.update({
    where: {
      id: tagId,
    },
    data: {
      name: tagName,
      color: tagColor,
    },
  });
};

export const deleteTag = async (tagId: string) => {
  return db.tag.delete({
    where: {
      id: tagId,
    },
  });
};
