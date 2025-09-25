import { useState } from "react";
import AppLogo from "@/assets/applogo.png";
import { Box, ChevronRight } from "lucide-react";

import { sidebarItems, modelItems } from "@/components/navigation/constants";
import SidebarItem from "@/components/navigation/SidebarItem";
import ModelItem from "@/components/navigation/ModelItem";

import Switch from "@/components/ui/Switch";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { setIsDarkMode } from "@/lib/redux/slice/themeSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.isDarkMode);

  const toggleSwitch = () => {
    dispatch(setIsDarkMode(!darkMode));
  };

  const [showModelList, setShowModelList] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();

  const toggleShowModel = () => {
    setShowModelList(!showModelList);
  };

  return (
    <aside
      className={`flex flex-col transform transition-width duration-500 bg-gradient-to-b
        ${
          darkMode
            ? "from-dark-secondary to-dark-accent text-dark-text"
            : "from-primary to-accent text-background"
        }
      `}
    >
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

          <div
            onClick={toggleShowModel}
            className="flex justify-between items-center cursor-pointer px-2 py-1 rounded-2xl my-4 w-full hover:bg-accent duration-500 ease-out gap-2"
          >
            <div className="flex items-center gap-2">
              <Box size={24} />
              <p className="font-semibold">Models</p>
            </div>
            <div className="mr-2">
              <ChevronRight
                className={`${
                  showModelList ? "rotate-90" : "rotate-0"
                } duration-500 ease-out`}
              />
            </div>
          </div>

          <ul
            className={`flex flex-col gap-2 px-8 py-2 overflow-hidden transition-all duration-500 ease-in-out
    ${showModelList ? "opacity-100" : "opacity-0"}
  `}
          >
            {modelItems.map((model) => (
              <ModelItem
                key={model.id}
                showModelList={showModelList}
                link={model.link}
                name={model.name}
              />
            ))}
          </ul>
        </div>

        <div className="flex justify-end px-6 my-4">
          <Switch isOn={darkMode} toggleSwitch={toggleSwitch} />
        </div>

        {/* Sidebar Footer */}
        <div className="flex justify-start items-center gap-2">
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
