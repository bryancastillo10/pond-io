import { useMBBRFormContext } from "@/features/mbbr/context/MBBRFormContext";
import useDrawer from "@/lib/drawer-ui/useDrawer";

import NumberInput from "@/components/ui/NumberInput";
import Button from "@/components/ui/Button";

const MBBRSecondStageForm = () => {
  const { handleCloseDrawer } = useDrawer();

  const { secondStageData, handleSave, handleChange } = useMBBRFormContext();

  return (
    <form className="grid grid-cols-1">
      <NumberInput
        label="Surface Area Loading Rate"
        value={secondStageData.salr}
        onChange={handleChange("secondStageData", "salr")}
        decimals={0}
        disabled={false}
        unit="g/m²-d"
      />

      <NumberInput
        label="Carrier Fill"
        value={secondStageData.carrierFill}
        onChange={handleChange("secondStageData", "carrierFill")}
        decimals={0}
        disabled={false}
        unit="%"
      />

      <NumberInput
        label="Liquid Depth"
        value={secondStageData.waterLevel}
        onChange={handleChange("secondStageData", "waterLevel")}
        decimals={2}
        disabled={false}
        unit="m"
      />

      <NumberInput
        label="Carrier Surface Area"
        value={secondStageData.carrierSurfaceArea}
        onChange={handleChange("secondStageData", "carrierSurfaceArea")}
        decimals={2}
        disabled={false}
        unit="m²/m³"
      />

      <NumberInput
        label="Length Width Ratio"
        value={secondStageData.lengthWidthRatio}
        onChange={handleChange("secondStageData", "lengthWidthRatio")}
        decimals={2}
        disabled={false}
        unit=""
      />

      <div className="flex justify-between gap-4 w-fit">
        <Button action={handleCloseDrawer} variant="danger">
          Cancel
        </Button>
        <Button
          action={() => handleSave("secondStageData", handleCloseDrawer)}
          variant="primary"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default MBBRSecondStageForm;
