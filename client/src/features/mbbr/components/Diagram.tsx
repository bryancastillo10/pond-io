import { useState } from "react";

import useMBBRDiagram from "@/features/mbbr/hooks/useMBBRDiagram";
import Button from "@/components/ui/Button";
import { Pencil } from "lucide-react";

import NumberInput from "@/components/ui/NumberInput";

import useDrawer from "@/lib/drawer-ui/useDrawer";
import StartSimulationButton from "@/components/ui/StartSimulationButton";

const initialInfData = {
  flowRate: "",
  infBOD: "",
  infTKN: "",
};

const Diagram = () => {
  const { handleOpenDrawer } = useDrawer();

  const [infData, setInfData] = useState(initialInfData);

  const handleInfluentData =
    (field: keyof typeof initialInfData) => (value: string) => {
      setInfData((prev) => ({ ...prev, [field]: value }));
    };

  const { mbbrRef } = useMBBRDiagram();

  const openFirstStageForm = () => {
    handleOpenDrawer("BOD Removal Unit", "FirstStageForm");
  };

  return (
    <div className="relative rounded-lg border shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <div className="absolute top-4 left-3 border border-primary px-2 py-1  h-fit rounded-lg shadow-md">
        <h3 className="text-sm font-semibold mb-2">Influent Form</h3>

        <NumberInput
          label="Flow Rate"
          unit="m³/d"
          value={infData.flowRate}
          onChange={handleInfluentData("flowRate")}
          disabled={false}
          decimals={0}
          max={10000}
        />

        <NumberInput
          label="Influent BOD"
          unit="mg/L"
          value={infData.infBOD}
          onChange={handleInfluentData("infBOD")}
          disabled={false}
          decimals={2}
        />

        <NumberInput
          label="Influent TKN"
          unit="mg N/L"
          value={infData.infTKN}
          onChange={handleInfluentData("infTKN")}
          disabled={false}
          decimals={2}
        />
      </div>

      <div className="absolute top-20 left-70">
        <Button action={() => openFirstStageForm()} variant="outline">
          <Pencil size={18} />
        </Button>
      </div>

      <div className="absolute top-20 left-140">
        <Button variant="outline">
          <Pencil size={18} />
        </Button>
      </div>

      <canvas ref={mbbrRef} width={1000} height={450} />

      <div className="absolute bottom-4 right-3 border border-primary px-2 py-1 w-[250px] h-[110px] rounded-lg shadow-md">
        Effluent Form
        <p>mg/ L</p>
      </div>

      <StartSimulationButton handleStart={() => {}} />
    </div>
  );
};

export default Diagram;
