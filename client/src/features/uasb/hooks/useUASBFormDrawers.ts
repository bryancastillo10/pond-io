import useDrawer from "@/lib/drawer-ui/useDrawer";

const useUASBFormDrawers = () => {
  const { handleOpenDrawer } = useDrawer();

  const openOperationalParametersForm = () => {
    handleOpenDrawer("Water Quality & Operation", "UASBOperationParameters");
  };

  const openEffluentAndGasProperties = () => {
    handleOpenDrawer("Effluent and Gas Characteristics", "UASBEffluentAndGas");
  };

  return {
    openOperationalParametersForm,
    openEffluentAndGasProperties,
  };
};

export default useUASBFormDrawers;
