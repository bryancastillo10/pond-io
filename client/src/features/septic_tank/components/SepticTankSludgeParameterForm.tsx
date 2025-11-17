import SizingFactorTable from "@/features/septic_tank/components/SizingFactorTable";

import NumberInput from "@/components/ui/NumberInput";
import Button from "@/components/ui/Button";

const SepticTankSludgeParameterForm = () => {
  return (
    <form className="grid grid-cols-1">
      <NumberInput
        label="Desludging Period"
        value=""
        onChange={() => {}}
        decimals={0}
        disabled={false}
        unit="years"
        helperText="Estimated number of years for desludging"
      />

      <NumberInput
        label="Sludge and scum accumulation rate"
        value=""
        onChange={() => {}}
        decimals={0}
        disabled={false}
        unit=""
        helperText="25 if blackwater, use 40 if blackwater for both blackwater & graywater"
      />

      <NumberInput
        label="Sizing Factor"
        value=""
        onChange={() => {}}
        decimals={2}
        unit=""
        disabled={false}
        helperText="Refer to the table below"
      />

      <SizingFactorTable />

      <div className="flex justify-between mt-4 gap-4 w-fit">
        <Button action={() => {}} variant="danger">
          Cancel
        </Button>
        <Button action={() => {}} variant="primary">
          Save
        </Button>
      </div>
    </form>
  );
};

export default SepticTankSludgeParameterForm;
