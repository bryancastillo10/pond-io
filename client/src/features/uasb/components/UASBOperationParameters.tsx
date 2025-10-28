import NumberInput from "@/components/ui/NumberInput";
import Button from "@/components/ui/Button";

const UASBOperationParameters = () => {
  return (
    <form className="grid grid-cols-1">
      <NumberInput
        label="Flow Rate"
        value=""
        onChange={() => {}}
        disabled={false}
        unit="m³/d"
      />

      <NumberInput
        label="Influent COD"
        value=""
        onChange={() => {}}
        disabled={false}
        unit="mg/L"
      />

      <NumberInput
        label="Organic Loading Rate"
        value=""
        onChange={() => {}}
        decimals={2}
        disabled={false}
        unit="kg COD/m³ d"
      />

      <NumberInput
        label="Upflow Velocity"
        value=""
        onChange={() => {}}
        decimals={2}
        disabled={false}
        unit="m/h"
      />

      <div className="flex justify-between gap-4 w-fit">
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

export default UASBOperationParameters;
