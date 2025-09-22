import { Outlet } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";

const ModelsOverview = () => {
  return (
    <div className="flex overflow-x-auto duration-500 ease-in-out w-full h-screen bg-background text-text">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-12 xl:pl-0">
        <p>Add Drawer component</p>

        <p>Models Home Page</p>
        {/* Need to customize routing for dynamic rendering of the nested route */}
        <Outlet />
      </div>
    </div>
  );
};

export default ModelsOverview;
