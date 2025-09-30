import TextHeader from "@/components/static/TextHeader";

import Card from "@/components/ui/Card";

import { modelsList } from "@/components/ui/constants";

const Home = () => {
  return (
    <section className="w-full h-full flex flex-col gap-2">
      <TextHeader text="Launch your Design" />
      <p className="text-balance leading-relaxed">
        Welcome to Pond.io! Use the interactive models below to simulate,
        analyze, and design wastewater treatment plant (WWTP) scenarios. Simply
        click on an available model such as MBBR or Anaerobic Digestion—to begin
        adjusting parameters and observing real-time results based on your
        inputs.
      </p>

      <div className="grid grid-cols-2 gap-2">
        {modelsList.map((model) => (
          <Card
            key={model.id}
            title={model.title}
            description={model.description}
            category={model.category}
            expectedResults={model.expectedResults}
            imageSrc={model.image}
            imageAlt={model.imageAlt}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
