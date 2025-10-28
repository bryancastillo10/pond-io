import NumberInput from "@/components/ui/NumberInput";
import Button from "@/components/ui/Button";

const UASBEffluentAndGas = () => {
  return (
    <form className="grid grid-cols-1">
      <NumberInput
        label="Percentage COD Removal"
        value=""
        onChange={() => {}}
        decimals={0}
        disabled={false}
        unit="%"
      />

      <NumberInput
        label="Methane Yield"
        value=""
        onChange={() => {}}
        disabled={false}
        unit="m³ CH₄/ kg COD"
      />

      <NumberInput
        label="Methane Fraction in Biogas"
        value=""
        onChange={() => {}}
        decimals={1}
        disabled={false}
        unit=""
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

export default UASBEffluentAndGas;
