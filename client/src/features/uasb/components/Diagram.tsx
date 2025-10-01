import useUASBDiagram from "@/features/uasb/hooks/useUASBDiagram";
const Diagram = () => {
  const { uasbRef } = useUASBDiagram();

  return (
    <div className="relative rounded-lg border shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <canvas ref={uasbRef} width={1000} height={550} />
    </div>
  );
};

export default Diagram;
