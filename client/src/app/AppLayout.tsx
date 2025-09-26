import { Outlet } from "react-router-dom";

import Sidebar from "@/components/navigation/Sidebar";
import ThemeProvider from "@/app/ThemeProvider";
import Drawer from "@/components/navigation/Drawer";

const AppLayout = () => {
  return (
    <div className="flex overflow-x-auto duration-500 ease-in-out w-full h-screen">
      <Sidebar />
      <ThemeProvider>
        <Drawer />
        <Outlet />
      </ThemeProvider>
    </div>
  );
};

export default AppLayout;
