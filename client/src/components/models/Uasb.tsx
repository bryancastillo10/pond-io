import TextHeader from "@/components/static/TextHeader";

const UasbSimulation = () => {
  return (
    <section className="w-full h-full flex flex-col gap-2">
      <TextHeader
        text="UASB (Upflow Anaerobic Sludge Blanket) Reactor"
        withLine
      />
      <div className="flex flex-col gap-4 text-balance xl:w-[90%]">
        <p className="text-balance leading-relaxed">
          The Upflow Anaerobic Sludge Blanket (UASB) reactor is a high-rate
          anaerobic treatment system where wastewater flows upward through a
          dense blanket of microbial sludge. This process efficiently converts
          organic pollutants into biogas (methane and carbon dioxide), making it
          a sustainable treatment option.
        </p>
      </div>
    </section>
  );
};

export default UasbSimulation;
