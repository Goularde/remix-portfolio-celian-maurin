import db from "~/db.server";
import { unlink } from "fs";

export const uploadImage = async (
  fileName: string,
  filePath: string,
  projectId: string
) => {
  // Check if the image already exist
  const prevProject = await db.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      image: true,
    },
  });

  // Delete old image
  if (prevProject?.image) {
    // Delete from disk
    unlink(prevProject.image.filePath, (err) => {
      if (err) throw err;
    });
    // Delete from db
    await db.image.delete({
      where: {
        id: prevProject.image.id,
      },
    });
  }

  // Create new image in db
  return await db.image.create({
    data: {
      fileName: fileName,
      filePath: filePath,
      projectId: projectId,
    },
  });
};
