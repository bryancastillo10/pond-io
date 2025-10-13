import useMBBRForm from "@/features/mbbr/hooks/useMBBRForm";
import useDrawer from "@/lib/drawer-ui/useDrawer";

const useMBBRFormDrawers = () => {
  const { handleOpenDrawer } = useDrawer();

  const { infData, effData, firstStageData, secondStageData, handleChange } =
    useMBBRForm();

  const openInlfuentForm = () => {
    handleOpenDrawer("MBBR Influent", "MBBRInfluentForm", {
      infData,
      handleChange,
    });
  };

  const openFirstStageForm = () => {
    handleOpenDrawer("MBBR BOD Removal Unit", "MBBRFirstStageForm", {
      firstStageData,
      handleChange,
    });
  };

  const openSecondStageForm = () => {
    handleOpenDrawer("MBBR Nitrification Unit", "MBBRSecondStageForm", {
      secondStageData,
      handleChange,
    });
  };

  const openEffluentForm = () => {
    handleOpenDrawer("MBBR Effluent", "MBBREffluentForm", {
      effData,
      handleChange,
    });
  };

  return {
    openInlfuentForm,
    openFirstStageForm,
    openSecondStageForm,
    openEffluentForm,
  };
};

export default useMBBRFormDrawers;
