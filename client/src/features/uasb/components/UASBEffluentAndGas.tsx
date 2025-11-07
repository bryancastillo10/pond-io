import { useUASBFormContext } from "@/features/uasb/context/UASBFormContext";
import useDrawer from "@/lib/drawer-ui/useDrawer";

import NumberInput from "@/components/ui/NumberInput";
import Button from "@/components/ui/Button";

const UASBEffluentAndGas = () => {
  const { handleCloseDrawer } = useDrawer();
  const { targetEffluent, handleCancel, handleSave, handleChange } =
    useUASBFormContext();

  return (
    <form className="grid grid-cols-1">
      <NumberInput
        label="Percentage COD Removal"
        value={targetEffluent.effPercCODRemoval}
        onChange={handleChange("targetEffluent", "effPercCODRemoval")}
        decimals={0}
        disabled={false}
        unit="%"
      />

      <NumberInput
        label="Methane Yield"
        value={targetEffluent.methaneYield}
        onChange={handleChange("targetEffluent", "methaneYield")}
        disabled={false}
        unit="m³ CH₄/ kg COD"
      />

      <NumberInput
        label="Methane Fraction in Biogas"
        value={targetEffluent.methaneFraction}
        onChange={handleChange("targetEffluent", "methaneFraction")}
        decimals={1}
        disabled={false}
        unit=""
      />

      <div className="flex justify-between gap-4 w-fit">
        <Button
          action={() => handleCancel("targetEffluent", handleCloseDrawer)}
          variant="danger"
        >
          Cancel
        </Button>
        <Button
          action={() => handleSave("targetEffluent", handleCloseDrawer)}
          variant="primary"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UASBEffluentAndGas;
