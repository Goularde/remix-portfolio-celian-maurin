import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProjectCard from "~/components/ProjectCard";
import { getAllProjects } from "~/models/project.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio Goularde" },
    { name: "description", content: "Bienvenue dans le portfolio de Goularde" },
  ];
};

export const loader = async () => {
  const projects = await getAllProjects();
  return json({ projects });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl">Bienvenue sur le Portfolio de Goularde</h1>
      <div className="flex justify-around flex-wrap gap-12 p-12 ">
        {data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
