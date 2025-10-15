import { useMBBRFormContext } from "@/features/mbbr/context/MBBRFormContext";
import NumberInput from "@/components/ui/NumberInput";

const MBBRInfluentForm = () => {
  const { infData, handleChange } = useMBBRFormContext();

  return (
    <div className="">
      <form>
        <NumberInput
          label="Flow Rate"
          value={infData.flowRate}
          onChange={handleChange("infData", "flowRate")}
          disabled={false}
          unit="m3/d"
        />
      </form>
    </div>
  );
};

export default MBBRInfluentForm;
