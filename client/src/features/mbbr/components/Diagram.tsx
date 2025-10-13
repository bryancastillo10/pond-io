import { useState } from "react";

import useMBBRDiagram from "@/features/mbbr/hooks/useMBBRDiagram";

import useDrawer from "@/lib/drawer-ui/useDrawer";
import EditFormButton from "@/components/ui/EditFormButton";
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
    handleOpenDrawer("BOD Removal Unit", "MBBRFirstStageForm");
  };

  return (
    <div className="relative rounded-lg border shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <EditFormButton
        openDrawer={openFirstStageForm}
        position="top-40 left-30"
      />

      <EditFormButton
        openDrawer={openFirstStageForm}
        position="top-20 left-110"
      />

      <EditFormButton
        openDrawer={openFirstStageForm}
        position="top-20 right-120"
      />
      <canvas ref={mbbrRef} width={1000} height={450} />

      <EditFormButton
        openDrawer={openFirstStageForm}
        position="bottom-60 right-40"
      />
      <StartSimulationButton handleStart={() => {}} />
    </div>
  );
};

export default Diagram;
