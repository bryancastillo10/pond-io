import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  name: string;
  link: string;
}

const SidebarItem = ({ name, link, icon: Icon }: SidebarItemProps) => {
  return (
    <Link
      to={link}
      className="flex justify-start items-center px-2 py-2 hover:bg-accent duration-500 ease-out rounded-2xl my-4 w-fit gap-2"
    >
      <Icon size={24} />
      <span className="font-semibold">{name}</span>
    </Link>
  );
};

export default SidebarItem;
