import { useUASBFormContext } from "@/features/uasb/context/UASBFormContext";
import useDrawer from "@/lib/drawer-ui/useDrawer";

import NumberInput from "@/components/ui/NumberInput";
import Button from "@/components/ui/Button";

const UASBOperationParameters = () => {
  const { handleCloseDrawer } = useDrawer();
  const { parameters, handleSave, handleChange } = useUASBFormContext();

  return (
    <form className="grid grid-cols-1">
      <NumberInput
        label="Flow Rate"
        value={parameters.flowRate}
        onChange={handleChange("parameters", "flowRate")}
        disabled={false}
        unit="m³/d"
      />

      <NumberInput
        label="Influent COD"
        value={parameters.infCOD}
        onChange={handleChange("parameters", "infCOD")}
        disabled={false}
        unit="mg/L"
      />

      <NumberInput
        label="Organic Loading Rate"
        value={parameters.olr}
        onChange={handleChange("parameters", "olr")}
        decimals={2}
        disabled={false}
        unit="kg COD/m³ d"
      />

      <NumberInput
        label="Upflow Velocity"
        value={parameters.upflowVelocity}
        onChange={handleChange("parameters", "upflowVelocity")}
        decimals={2}
        disabled={false}
        unit="m/h"
      />

      <div className="flex justify-between gap-4 w-fit">
        <Button action={handleCloseDrawer} variant="danger">
          Cancel
        </Button>
        <Button
          action={() => handleSave("parameters", handleCloseDrawer)}
          variant="primary"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UASBOperationParameters;
