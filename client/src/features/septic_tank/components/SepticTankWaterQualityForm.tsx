import Button from "@/components/ui/Button";
import NumberInput from "@/components/ui/NumberInput";

const SepticTankWaterQualityForm = () => {
  return (
    <form className="grid grid-colls">
      <h3 className="my-2 font-semibold tracking-wider">
        Water Quality & Operations
      </h3>

      <NumberInput
        label="Estimated Number of Daily Users"
        value=""
        onChange={() => {}}
        decimals={0}
        disabled={false}
        unit="persons"
      />

      <NumberInput
        label="Water Consumption per Person"
        value=""
        onChange={() => {}}
        decimals={0}
        disabled={false}
        unit="L"
      />

      <h3 className="my-2 font-semibold tracking-wider">Basin Dimensions</h3>

      <NumberInput
        label="Assumed Water Depth"
        value=""
        onChange={() => {}}
        decimals={2}
        disabled={false}
        unit="m"
        helperText="At least 1.20 m is required"
      />

      <NumberInput
        label="Freeboard"
        value=""
        onChange={() => {}}
        decimals={2}
        disabled={false}
        unit="m"
        helperText="Allowance depth"
      />

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

export default SepticTankWaterQualityForm;
