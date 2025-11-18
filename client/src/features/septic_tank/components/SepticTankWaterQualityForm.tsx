import { useSepticTankFormContext } from "@/features/septic_tank/context/SepticTankFormContext";
import useDrawer from "@/lib/drawer-ui/useDrawer";

import Button from "@/components/ui/Button";
import NumberInput from "@/components/ui/NumberInput";

const SepticTankWaterQualityForm = () => {
  const { handleCloseDrawer } = useDrawer();

  const { operationsData, handleCancel, handleSave, handleChange } =
    useSepticTankFormContext();

  return (
    <form className="grid grid-colls">
      <h3 className="my-2 font-semibold tracking-wider">
        Water Quality & Operations
      </h3>

      <NumberInput
        label="Estimated Number of Daily Users"
        value={operationsData.numberOfUsers}
        onChange={handleChange("operations", "numberOfUsers")}
        decimals={0}
        disabled={false}
        unit="persons"
      />

      <NumberInput
        label="Water Consumption per Person"
        value={operationsData.waterConsumption}
        onChange={handleChange("operations", "waterConsumption")}
        decimals={0}
        disabled={false}
        unit="L"
      />

      <h3 className="my-2 font-semibold tracking-wider">Basin Dimensions</h3>

      <NumberInput
        label="Assumed Water Depth"
        value={operationsData.waterDepth}
        onChange={handleChange("operations", "waterDepth")}
        decimals={2}
        disabled={false}
        unit="m"
        helperText="At least 1.20 m is required"
      />

      <NumberInput
        label="Freeboard"
        value={operationsData.allowanceDepth}
        onChange={handleChange("operations", "allowanceDepth")}
        decimals={2}
        disabled={false}
        unit="m"
        helperText="Allowance depth"
      />

      <div className="flex justify-between mt-4 gap-4 w-fit">
        <Button
          action={() => handleCancel("operations", handleCloseDrawer)}
          variant="danger"
        >
          Cancel
        </Button>
        <Button
          action={() => handleSave("operationsData", handleCloseDrawer)}
          variant="primary"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default SepticTankWaterQualityForm;
