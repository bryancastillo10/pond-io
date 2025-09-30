import TextHeader from "@/components/static/TextHeader";
import Diagram from "@/features/mbbr/components/Diagram";

const MbbrSimulation = () => {
  return (
    <section className="w-full h-full flex flex-col gap-2">
      <TextHeader text="MBBR (Moving Bed Biofilm Reactor) Process" withLine />
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
