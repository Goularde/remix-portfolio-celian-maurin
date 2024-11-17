import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const getProjects = () => {
  return [
    {
      name: "Project 1",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      tags: {
        create: [
          { name: "React", color: "#61dafb" },
          { name: "Node", color: "#6b46c1" },
          { name: "Remix", color: "#ef4444" },
        ],
      },
    },
    {
      name: "Project 2",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      tags: {},
    },
  ];
};

const seed = async () => {
  await Promise.all(
    getProjects().map((project) => db.project.create({ data: project }))
  );
};

seed();
