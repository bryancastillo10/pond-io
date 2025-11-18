import { useSepticTankFormContext } from "@/features/septic_tank/context/SepticTankFormContext";
import useDrawer from "@/lib/drawer-ui/useDrawer";

import SizingFactorTable from "@/features/septic_tank/components/SizingFactorTable";

import NumberInput from "@/components/ui/NumberInput";
import Button from "@/components/ui/Button";

const SepticTankSludgeParameterForm = () => {
  const { handleCloseDrawer } = useDrawer();

  const { sludgeSpecs, handleCancel, handleSave, handleChange } =
    useSepticTankFormContext();

  return (
    <form className="grid grid-cols-1">
      <NumberInput
        label="Desludging Period"
        value={sludgeSpecs.desludgingPeriod}
        onChange={handleChange("sludgeSpecs", "desludgingPeriod")}
        decimals={0}
        disabled={false}
        unit="years"
        helperText="Estimated number of years for desludging"
      />

      <NumberInput
        label="Sludge and scum accumulation rate"
        value={sludgeSpecs.accumulationRate}
        onChange={handleChange("sludgeSpecs", "accumulationRate")}
        decimals={0}
        disabled={false}
        unit=""
        helperText="25 if blackwater, use 40 if blackwater for both blackwater & graywater"
      />

      <NumberInput
        label="Sizing Factor"
        value={sludgeSpecs.sizingFactor}
        onChange={handleChange("sludgeSpecs", "sizingFactor")}
        decimals={2}
        unit=""
        disabled={false}
        helperText="Refer to the table below"
      />

      <SizingFactorTable />

      <div className="flex justify-between mt-4 gap-4 w-fit">
        <Button
          action={() => handleCancel("sludgeSpecs", handleCloseDrawer)}
          variant="danger"
        >
          Cancel
        </Button>
        <Button
          action={() => handleSave("sludgeSpecsData", handleCloseDrawer)}
          variant="primary"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default SepticTankSludgeParameterForm;
