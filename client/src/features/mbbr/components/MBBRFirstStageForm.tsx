import { useMBBRFormContext } from "@/features/mbbr/context/MBBRFormContext";
import useDrawer from "@/lib/drawer-ui/useDrawer";

import NumberInput from "@/components/ui/NumberInput";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

const MBBRFirstStageForm = () => {
  const { handleCloseDrawer } = useDrawer();

  const { firstStageData, formCompletion, handleChange } = useMBBRFormContext();

  const handleSave = (group: keyof typeof formCompletion) => {
    if (formCompletion[group]) {
      handleCloseDrawer();
    } else {
      toast.success("Please fill up the form");
    }
  };

  return (
    <form className="grid grid-cols-1">
      <NumberInput
        label="Surface Area Loading Rate"
        value={firstStageData.salr}
        onChange={handleChange("firstStageData", "salr")}
        decimals={0}
        disabled={false}
        unit="g/m²-d"
      />

      <NumberInput
        label="Carrier Fill"
        value={firstStageData.carrierFill}
        onChange={handleChange("firstStageData", "carrierFill")}
        decimals={0}
        disabled={false}
        unit="%"
      />

      <NumberInput
        label="Liquid Depth"
        value={firstStageData.waterLevel}
        onChange={handleChange("firstStageData", "waterLevel")}
        decimals={2}
        disabled={false}
        unit="m"
      />

      <NumberInput
        label="Carrier Surface Area"
        value={firstStageData.carrierSurfaceArea}
        onChange={handleChange("firstStageData", "carrierSurfaceArea")}
        decimals={2}
        disabled={false}
        unit="m²/m³"
      />

      <NumberInput
        label="Length Width Ratio"
        value={firstStageData.lengthWidthRatio}
        onChange={handleChange("firstStageData", "lengthWidthRatio")}
        decimals={2}
        disabled={false}
        unit=""
      />

      <div className="flex justify-between gap-4 w-fit">
        <Button action={handleCloseDrawer} variant="outline">
          Cancel
        </Button>
        <Button action={() => handleSave("infData")} variant="primary">
          Save
        </Button>
      </div>
    </form>
  );
};

export default MBBRFirstStageForm;
