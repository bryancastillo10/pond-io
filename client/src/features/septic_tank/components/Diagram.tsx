import useSepticTankDiagram from "@/features/septic_tank/hooks/useSepticTankDiagram";

import EditFormButton from "@/components/ui/EditFormButton";
import StartSimulationButton from "@/components/ui/StartSimulationButton";

const Diagram = () => {
  const { septicTankRef } = useSepticTankDiagram();

  return (
    <div className="relative rounded-lg oveflow-x-scroll border shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <EditFormButton
        openDrawer={() => {}}
        position="absolute left-[10%] md:left-[28%] top-[20%]"
        isFormCompleted={false}
      />

      <EditFormButton
        openDrawer={() => {}}
        position="absolute left-[30%] md:left-[38%] top-[20%]"
        isFormCompleted={false}
      />

      <canvas ref={septicTankRef} width={1000} height={400} />

      <EditFormButton
        openDrawer={() => {}}
        position="absolute right-[28%] top-[20%]"
        isFormCompleted={false}
      />

      <StartSimulationButton handleStart={() => {}} />
    </div>
  );
};

export default Diagram;
