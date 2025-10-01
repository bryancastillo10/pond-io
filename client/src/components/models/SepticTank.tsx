import TextHeader from "@/components/static/TextHeader";
import Diagram from "@/features/septic_tank/components/Diagram";

const SepticTankSimulation = () => {
  return (
    <section className="w-full h-full flex flex-col gap-2">
      <TextHeader text="Septic Tank" withLine />
      <div className="flex flex-col gap-4 text-balance xl:w-[90%]">
        <p className="text-balance leading-relaxed">
          The septic tank system is an on-site wastewater treatment solution,
          primarily relying on gravity to separate solids from liquid waste.
          Biological activity then decomposes organic matter, preparing the
          effluent for subsequent treatment or disposal, often through a drain
          field.
        </p>
      </div>

      <Diagram />
    </section>
  );
};

export default SepticTankSimulation;
