import useSepticTankFormDrawers from "@/features/septic_tank/hooks/useSepticTankFormDrawers";
import useSepticTankDiagram from "@/features/septic_tank/hooks/useSepticTankDiagram";
import { useSepticTankFormContext } from "@/features/septic_tank/context/SepticTankFormContext";

import EditFormButton from "@/components/ui/EditFormButton";
import StartSimulationButton from "@/components/ui/StartSimulationButton";

const Diagram = () => {
  const { septicTankRef } = useSepticTankDiagram();

  const { formCompletion, handleSimulate } = useSepticTankFormContext();

  const { openWaterQualityForm, openSludgeCharacteristicsForm } =
    useSepticTankFormDrawers();

  return (
    <div className="relative rounded-lg oveflow-x-scroll border shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <EditFormButton
        openDrawer={openWaterQualityForm}
        position="absolute left-[10%] md:left-[28%] top-[20%]"
        isFormCompleted={formCompletion.operationsData}
      />

      <canvas ref={septicTankRef} width={1000} height={400} />

      <EditFormButton
        openDrawer={openSludgeCharacteristicsForm}
        position="absolute right-[28%] top-[20%]"
        isFormCompleted={formCompletion.sludgeSpecsData}
      />

      <StartSimulationButton handleStart={handleSimulate} />
    </div>
  );
};

export default Diagram;
