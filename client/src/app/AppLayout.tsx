import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import Sidebar from "@/components/navigation/Sidebar";
import ThemeProvider from "@/app/ThemeProvider";
import FormProvider from "@/app/FormProvider";
import Drawer from "@/components/navigation/Drawer";

const AppLayout = () => {
  return (
    <div className="flex-1 flex overflow-x-auto duration-500 ease-in-out w-full h-full">
      <Sidebar />
      <ThemeProvider>
        <section className="min-h-screen">
          <Toaster richColors position="top-right" />
          <FormProvider>
            <Drawer />
            <Outlet />
          </FormProvider>
        </section>
      </ThemeProvider>
    </div>
  );
};

export default AppLayout;
