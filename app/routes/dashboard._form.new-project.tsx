import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Project" },
    { name: "nouveau projet", content: "Page de création d'un nouveau projet" },
  ];
};
const NewProject = () => {
  return null;
};
export default NewProject;
