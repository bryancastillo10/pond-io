import { Outlet } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";

const AppLayout = () => {
  return (
    <div className="flex overflow-x-auto duration-500 ease-in-out w-full h-screen bg-background text-text">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-12 xl:pl-0">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
