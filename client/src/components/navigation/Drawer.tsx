import { X } from "lucide-react";
import { closeDrawer } from "@/lib/redux/slice/drawerSlice";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";

import { drawerForms } from "@/lib/drawer-ui/formMappings";

const Drawer = () => {
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(closeDrawer());
  };

  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const { isOpenDrawer, title, componentName, bodyProps } = useAppSelector(
    (state) => state.drawer
  );

  const BodyComponent = componentName ? drawerForms[componentName] : null;
  return (
    <>
      <>
        {isOpenDrawer && (
          <div
            onClick={onClose}
            className="fixed inset-0 z-40 backdrop-blur-[1px]"
          />
        )}
        <div
          className={`fixed z-40 flex flex-col top-0 right-0 w-full xl:w-[50%] h-screen 
        transform transition-translate duration-500 ease-in shadow-lg py-3 px-6
        ${isOpenDrawer ? "translate-x-0" : "translate-x-full"}
        bg-gradient-to-b  ${
          isDarkMode
            ? "from-dark-secondary to-dark-accent text-dark-text"
            : "from-primary to-accent text-background"
        }
     `}
        >
          <div className={`flex justify-between items-center  border-b py-2 `}>
            <h1 className={`text-2xl tracking-wider`}>{title}</h1>
            <div
              onClick={onClose}
              className="rounded-full cursor-pointer hover:bg-primary hover:text-light duration-500 p-2"
            >
              <X size="20" />
            </div>
          </div>
          <div className="mt-4 overflow-y-auto overflow-x-hidden">
            {BodyComponent && <BodyComponent {...bodyProps} />}
          </div>
        </div>
      </>
    </>
  );
};

export default Drawer;
