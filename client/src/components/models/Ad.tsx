import TextHeader from "@/components/static/TextHeader";
import Diagram from "@/features/ad/components/Diagram";

const AnaerobicDigestionSimulation = () => {
  return (
    <section className="w-full h-full flex flex-col gap-2">
      <TextHeader
        text="Anaerobic Digestion (Acid and Methane Tank) Process"
        withLine
      />

      <div className="flex flex-col gap-4 text-balance xl:w-[90%]">
        <p className="text-balance leading-relaxed">
          This two-stage Anaerobic Digestion system is an advanced biotechnology
          process that breaks down organic matter without oxygen. It
          strategically separates the process into an acid tank (hydrolysis and
          acidogenesis) and a methane tank (acetogenesis and methanogenesis) to
          optimize conditions and maximize biogas production.
        </p>
      </div>

      <Diagram />
    </section>
  );
};

export default AnaerobicDigestionSimulation;
