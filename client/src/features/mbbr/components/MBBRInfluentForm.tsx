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
      </form>
    </div>
  );
};

export default MBBRInfluentForm;
