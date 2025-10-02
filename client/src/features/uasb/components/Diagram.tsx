import useUASBDiagram from "@/features/uasb/hooks/useUASBDiagram";

import StartSimulationButton from "@/components/ui/StartSimulationButton";

const Diagram = () => {
  const { uasbRef } = useUASBDiagram();

  return (
    <div className="relative rounded-lg border shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <canvas ref={uasbRef} width={1000} height={550} />

      <StartSimulationButton handleStart={() => {}} />
    </div>
  );
};

export default Diagram;
