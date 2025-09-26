import useMBBRDiagram from "@/features/mbbr/hooks/useMBBRDiagram";

const Diagram = () => {
  const { mbbrRef } = useMBBRDiagram();

  return (
    <div className="relative border my-2 w-full h-[50vh] mx-auto flex justify-center items-center">
      <canvas ref={mbbrRef} width={1000} height={300} />
    </div>
  );
};

export default Diagram;
