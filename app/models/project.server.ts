import db from "~/db.server";

export const updateProject = async (
  projectId: string,
  projectName: string,
  projectDescription: string,
  tags: {
    id: string;
    name: string;
  }[]
) => {
  tags.forEach(async (tag) => {
    await db.tag.update({
      where: {
        id: tag.id,
      },
      data: {
        name: tag.name,
      },
    });
  });
  return db.project.update({
    where: {
      id: projectId,
    },
    data: {
      name: projectName,
      description: projectDescription,
    },
  });
};
export const getAllProjects = () => {
  return db.project.findMany({
    include: {
      tags: {
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProject = (projectId: string) => {
  return db.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      tags: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });
};

export const createProject = async (name?: string, description?: string) => {
  return db.project.create({
    data: {
      name: name ? name : "New Project",
      description: description ? description : "Description",
    },
  });
};

export const deleteProject = async (projectId: string) => {
  return db.project.delete({
    where: {
      id: projectId,
    },
  });
};
