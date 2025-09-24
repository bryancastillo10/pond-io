import { Link } from "react-router-dom";

interface ModelItemProps {
  showModelList: boolean;
  name: string;
  link: string;
}

const ModelItem = ({ link, name, showModelList }: ModelItemProps) => {
  return (
    <Link className="hover:underline my-0.5" to={link}>
      <li
        className={`${
          showModelList
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0"
        } transition-all duration-300 ease-out delay-100`}
      >
        {name}
      </li>
    </Link>
  );
};

export default ModelItem;
