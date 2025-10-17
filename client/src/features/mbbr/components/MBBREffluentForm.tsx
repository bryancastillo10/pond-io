import { useMBBRFormContext } from "@/features/mbbr/context/MBBRFormContext";
import useDrawer from "@/lib/drawer-ui/useDrawer";

import NumberInput from "@/components/ui/NumberInput";
import Button from "@/components/ui/Button";

const MBBREffluentForm = () => {
  const { handleCloseDrawer } = useDrawer();

  const { effData, handleSave, handleChange } = useMBBRFormContext();

  return (
    <form className="grid grid-cols-1">
      <NumberInput
        label="Target Percentage of BOD Removal"
        value={effData.effPercBODRemoval}
        onChange={handleChange("effData", "effPercBODRemoval")}
        decimals={0}
        disabled={false}
        unit="%"
      />

      <NumberInput
        label="Target Percentage of TKN Removal"
        value={effData.effPercTKNRemoval}
        onChange={handleChange("effData", "effPercTKNRemoval")}
        decimals={0}
        disabled={false}
        unit="%"
      />

      <div className="flex justify-between gap-4 w-fit">
        <Button action={handleCloseDrawer} variant="danger">
          Cancel
        </Button>
        <Button
          action={() => handleSave("effData", handleCloseDrawer)}
          variant="primary"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default MBBREffluentForm;
