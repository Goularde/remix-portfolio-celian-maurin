type ProjectCardProps = {
  name: string;
  description: string;
  tags: { id: string; name: string; color: string }[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
};
const ProjectCard = ({
  name,
  description,
  tags,
  children,
  style,
}: ProjectCardProps) => {
  return (
    <div
      className="flex flex-col p-4 h-full max-w-xs rounded-lg bg-background-light border-2 border-accent justify-between"
      style={style}
    >
      {children}
      <div>
        <img
          src="https://picsum.photos/300/200"
          alt="random"
          className="rounded-md"
        />
        <h1 className="text-xl mt-4">{name}</h1>
        <p className="mt-2 text-gray-400">{description}</p>
      </div>
      <div>
        <ul className="flex gap-2 mt-4 flex-wrap">
          {tags.map((tag) => (
            <Tag key={tag.id} text={tag.name} color={tag.color} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ProjectCard;

type TagProps = {
  text: string;
  color: string;
};

const Tag = ({ text, color }: TagProps) => {
  return (
    <li className="p-2 pr-3 rounded-full bg-background-light border-2 border-accent flex items-center justify-center gap-1 hover:scale-110">
      <span
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <p className="text-xs leading-3">{text}</p>
    </li>
  );
};
