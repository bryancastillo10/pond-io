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

  const { formCompletion } = useMBBRFormContext();

  return (
    <div className="relative rounded-lg border shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <EditFormButton
        openDrawer={openInlfuentForm}
        position="top-25 md:top-40 left-30"
        isFormCompleted={formCompletion.infData}
      />

      <EditFormButton
        openDrawer={openFirstStageForm}
        position="top-20 left-100"
        isFormCompleted={formCompletion.firstStageData}
      />

      <EditFormButton
        openDrawer={openSecondStageForm}
        position="top-20 right-120"
        isFormCompleted={formCompletion.secondStageData}
      />
      <canvas ref={mbbrRef} width={1000} height={450} />

      <EditFormButton
        openDrawer={openEffluentForm}
        position="bottom-60 right-40"
        isFormCompleted={formCompletion.effData}
      />
      <StartSimulationButton handleStart={() => {}} />
    </div>
  );
};

export default Diagram;
