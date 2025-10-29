import useUASBDiagram from "@/features/uasb/hooks/useUASBDiagram";
import useUASBFormDrawers from "@/features/uasb/hooks/useUASBFormDrawers";
import { useUASBFormContext } from "@/features/uasb/context/UASBFormContext";

import StartSimulationButton from "@/components/ui/StartSimulationButton";
import EditFormButton from "@/components/ui/EditFormButton";

const Diagram = () => {
  const { uasbRef } = useUASBDiagram();

  const { openOperationalParametersForm, openEffluentAndGasProperties } =
    useUASBFormDrawers();

  const { formCompletion, handleSimulate } = useUASBFormContext();

  return (
    <div className="relative rounded-lg border overflow-x-scroll shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <EditFormButton
        openDrawer={openOperationalParametersForm}
        position="absolute top-[50%] left-[12%] md:left-[35%]"
        isFormCompleted={formCompletion.parameters}
      />

      <canvas ref={uasbRef} width={1000} height={550} />

      <EditFormButton
        openDrawer={openEffluentAndGasProperties}
        position="absolute top-[50%] right-[12%] md:right-[30%]"
        isFormCompleted={formCompletion.targetEffluent}
      />

      <StartSimulationButton handleStart={handleSimulate} />
    </div>
  );
};

export default Diagram;
