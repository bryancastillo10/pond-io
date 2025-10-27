import useMBBRFormDrawers from "@/features/mbbr/hooks/useMBBRFormDrawers";
import useMBBRDiagram from "@/features/mbbr/hooks/useMBBRDiagram";
import { useMBBRFormContext } from "../context/MBBRFormContext";

import EditFormButton from "@/components/ui/EditFormButton";
import StartSimulationButton from "@/components/ui/StartSimulationButton";

const Diagram = () => {
  const { mbbrRef } = useMBBRDiagram();

  const {
    openInlfuentForm,
    openFirstStageForm,
    openSecondStageForm,
    openEffluentForm,
  } = useMBBRFormDrawers();

  const { formCompletion, handleSimulate } = useMBBRFormContext();

  return (
    <div className="relative rounded-lg border overflow-x-scroll shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <EditFormButton
        openDrawer={openInlfuentForm}
        position="absolute left-[5%] top-[10%] md:top-[25%] md:left-[10%] lg:top-[15%]"
        isFormCompleted={formCompletion.infData}
      />

      <EditFormButton
        openDrawer={openFirstStageForm}
        position="absolute left-[30%] top-[10%] md:top-[20%] md:left-[45%] lg:top-[15%]"
        isFormCompleted={formCompletion.firstStageData}
      />

      <EditFormButton
        openDrawer={openSecondStageForm}
        position="absolute top-[10%] right-[10%] md:top-[20%] md:right-[20%] lg:top-[15%]"
        isFormCompleted={formCompletion.secondStageData}
      />
      <canvas ref={mbbrRef} width={1000} height={450} />

      <EditFormButton
        openDrawer={openEffluentForm}
        position="absolute bottom-[15%] right-[15%]"
        isFormCompleted={formCompletion.effData}
      />
      <StartSimulationButton handleStart={handleSimulate} />
    </div>
  );
};

export default Diagram;
