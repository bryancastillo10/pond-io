import AppLogo from "@/assets/applogo.png";
import { Box, ChevronRight } from "lucide-react";

import { sidebarItems } from "@/components/navigation/sidebaritem";
import SidebarItem from "@/components/navigation/SidebarItem";

const Sidebar = () => {
  const currentYear = new Date().getFullYear();

  return (
    <aside className="flex flex-col transform transition-width duration-500 bg-gradient-to-b from-primary to-accent text-background">
      <div className="relative py-8 px-2 flex-grow flex flex-col">
        {/* Sidebar Items */}
        <div className="flex-grow">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              name={item.name}
              link={item.link}
              icon={item.icon}
            />
          ))}

          <div className="flex justify-between items-center px-2 rounded-2xl my-4 w-full gap-2">
            <div className="flex items-center gap-2">
              <Box size={24} />
              <p className="font-semibold">Models</p>
            </div>
            <div className="mr-2">
              <ChevronRight />
            </div>
          </div>

          <ul className="flex flex-col gap-2 px-8">
            <li>MBBR</li>
            <li>AD</li>
            <li>Septic Tank</li>
            <li>UASB</li>
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="flex justify-start items-center gap-2 mt-auto">
          <img src={AppLogo} alt="logo" className="size-10" />
          <div className="flex flex-col">
            <h1 className="text-xl tracking-wider text-left font-heading">
              Pond.io
            </h1>
            <p className="text-xs w-[80%]">
              &copy; All Rights Reserved {currentYear}{" "}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
