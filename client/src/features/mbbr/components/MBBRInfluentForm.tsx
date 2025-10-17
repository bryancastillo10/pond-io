import { useMBBRFormContext } from "@/features/mbbr/context/MBBRFormContext";
import useDrawer from "@/lib/drawer-ui/useDrawer";

import NumberInput from "@/components/ui/NumberInput";
import Button from "@/components/ui/Button";

const MBBRInfluentForm = () => {
  const { handleCloseDrawer } = useDrawer();
  const { infData, handleSave, handleChange } = useMBBRFormContext();

  return (
    <form className="grid grid-cols-1">
      <NumberInput
        label="Flow Rate"
        value={infData.flowRate}
        onChange={handleChange("infData", "flowRate")}
        decimals={0}
        disabled={false}
        unit="m³/d"
      />

      <NumberInput
        label="Influent BOD"
        value={infData.infBOD}
        onChange={handleChange("infData", "infBOD")}
        disabled={false}
        unit="mg/L"
      />

      <NumberInput
        label="Influent Total Kjeldahl Nitrogen"
        value={infData.infTKN}
        onChange={handleChange("infData", "infTKN")}
        disabled={false}
        unit="mg-N/L"
      />

      <div className="flex justify-between gap-4 w-fit">
        <Button action={handleCloseDrawer} variant="danger">
          Cancel
        </Button>
        <Button
          action={() => handleSave("infData", handleCloseDrawer)}
          variant="primary"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default MBBRInfluentForm;
