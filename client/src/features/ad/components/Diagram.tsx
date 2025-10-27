import useADDiagram from "@/features/ad/hooks/useADDiagram";

import EditFormButton from "@/components/ui/EditFormButton";
import StartSimulationButton from "@/components/ui/StartSimulationButton";
const Diagram = () => {
  const { adRef } = useADDiagram();

  return (
    <div className="relative rounded-lg border overflow-x-scroll  shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <EditFormButton
        openDrawer={() => {}}
        position="absolute left-[10%] top-[10%] md:top-[25%] md:left-[15%] lg:top-[40%]"
        isFormCompleted={false}
      />

      <EditFormButton
        openDrawer={() => {}}
        position="absolute left-[30%] top-[10%] md:top-[20%] md:left-[48%] lg:top-[20%]"
        isFormCompleted={false}
      />
      <canvas ref={adRef} width={1000} height={400} />

      <EditFormButton
        openDrawer={() => {}}
        position="absolute right-[40%] top-[10%] md:top-[20%] md:right-[15%] lg:top-[40%]"
        isFormCompleted={false}
      />

      <StartSimulationButton handleStart={() => {}} />
    </div>
  );
};

export default Diagram;
