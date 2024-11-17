import db from "~/db.server";

export const updateProject = async (
  projectId: string,
  projectName: string,
  projectDescription: string
) => {
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

export const createProject = async (name: string, description: string) => {
  return db.project.create({
    data: {
      name,
      description,
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
