import useDrawer from "@/lib/drawer-ui/useDrawer";

const useMBBRFormDrawers = () => {
  const { handleOpenDrawer } = useDrawer();

  const openInlfuentForm = () => {
    handleOpenDrawer("MBBR Influent", "MBBRInfluentForm");
  };

  const openFirstStageForm = () => {
    handleOpenDrawer("MBBR BOD Removal Unit", "MBBRFirstStageForm");
  };

  const openSecondStageForm = () => {
    handleOpenDrawer("MBBR Nitrification Unit", "MBBRSecondStageForm");
  };

  const openEffluentForm = () => {
    handleOpenDrawer("MBBR Effluent", "MBBREffluentForm");
  };

  return {
    openInlfuentForm,
    openFirstStageForm,
    openSecondStageForm,
    openEffluentForm,
  };
};

export default useMBBRFormDrawers;
