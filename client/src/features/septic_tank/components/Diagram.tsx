import useSepticTankDiagram from "@/features/septic_tank/hooks/useSepticTankDiagram";

const Diagram = () => {
  const { septicTankRef } = useSepticTankDiagram();

  return (
    <div className="relative rounded-lg border shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <canvas ref={septicTankRef} width={1000} height={400} />
    </div>
  );
};

export default Diagram;
