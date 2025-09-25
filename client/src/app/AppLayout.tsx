import { Outlet } from "react-router-dom";

import Sidebar from "@/components/navigation/Sidebar";
import ThemeProvider from "@/app/ThemeProvider";

const AppLayout = () => {
  return (
    <div className="flex overflow-x-auto duration-500 ease-in-out w-full h-screen bg-background text-text">
      <Sidebar />
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </div>
  );
};

export default AppLayout;
