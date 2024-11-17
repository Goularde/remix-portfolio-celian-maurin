export type ProjectType = {
  project: {
    id: string;
    name: string;
    description: string;
    tags?: { id: string; name: string; color: string }[];
  };
};
