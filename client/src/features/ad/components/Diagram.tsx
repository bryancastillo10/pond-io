import useADDiagram from "@/features/ad/hooks/useADDiagram";

const Diagram = () => {
  const { adRef } = useADDiagram();

  return (
    <div className="relative rounded-lg border shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <canvas ref={adRef} width={1000} height={400} />
    </div>
  );
};

export default Diagram;
