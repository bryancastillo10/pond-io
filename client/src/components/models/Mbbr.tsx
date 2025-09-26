import Diagram from "@/features/mbbr/components/Diagram";

const MbbrSimulation = () => {
  return (
    <section className="w-full h-full flex flex-col gap-2">
      <div className="inline-block w-fit my-2">
        <h1 className="text-2xl font-heading tracking-wider">
          MBBR (Moving Bed Biofilm Reactor) Process
        </h1>
        <hr className=" border" />
      </div>

      <div className="flex flex-col gap-4 text-balance xl:w-[90%]">
        <p className="text-balance leading-relaxed">
          The two-stage Moving Bed Biofilm Reactor (MBBR) system is a
          cutting-edge approach to wastewater treatment, separating the process
          into two distinct, highly-specialized biological reactors for maximum
          efficiency.
        </p>
      </div>

      <Diagram />
    </section>
  );
};

export default MbbrSimulation;
