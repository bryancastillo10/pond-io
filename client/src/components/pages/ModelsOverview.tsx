import { Outlet } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";

import Button from "@/components/ui/Button";

const ModelsOverview = () => {
  return (
    <div className="flex overflow-x-auto duration-500 ease-in-out w-full h-screen bg-background text-text">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-12 xl:pl-0">
        <p>Add Drawer component</p>

        <p>Models Home Page</p>

        <div className="grid grid-cols-2 gap-4 my-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="outline">Secondary Button</Button>
          <Button variant="danger">Cancel Button</Button>
          <Button>Default Button</Button>
        </div>
        {/* Need to customize routing for dynamic rendering of the nested route */}
        <Outlet />
      </div>
    </div>
  );
};

export default ModelsOverview;
