import useDrawer from "@/lib/drawer-ui/useDrawer";

const useSepticTankFormDrawers = () => {
  const { handleOpenDrawer } = useDrawer();

  const openWaterQualityForm = () => {
    handleOpenDrawer(
      "Water Quality Operations and Dimensions",
      "SepticTankWaterQualityForm"
    );
  };

  const openSludgeCharacteristicsForm = () => {
    handleOpenDrawer(
      "Sludge Volume and Characteristics",
      "SepticTankSludgeParameterForm"
    );
  };

  return {
    openWaterQualityForm,
    openSludgeCharacteristicsForm,
  };
};

export default useSepticTankFormDrawers;
