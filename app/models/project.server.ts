import db from "~/db.server";
import { unlink } from "fs";
export const updateProject = async (
  projectId: string,
  projectName: string,
  projectDescription: string,
  tags: {
    id: string;
    name: string;
    color: string;
  }[]
) => {
  tags.forEach(async (tag) => {
    await db.tag.update({
      where: {
        id: tag.id,
      },
      data: {
        name: tag.name,
        color: tag.color,
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
export const getAllProjects = async () => {
  return await db.project.findMany({
    include: {
      tags: {
        orderBy: {
          name: "asc",
        },
      },
      image: { select: { fileName: true } },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProject = async (projectId: string) => {
  return await db.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      tags: {
        orderBy: {
          name: "asc",
        },
      },
      image: { select: { fileName: true } },
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
  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      image: true,
    },
  });
  if (project?.image) {
    unlink(project.image.filePath, (err) => {
      if (err) throw err;
    });
    await db.image.delete({
      where: {
        projectId: projectId,
      },
    });
  }
  return await db.project.delete({
    where: {
      id: projectId,
    },
  });
};
