import TextHeader from "@/components/static/TextHeader";
import { useAppSelector } from "@/lib/redux/hooks";
import Card from "@/components/ui/Card";

import { modelsList } from "@/components/ui/constants";

const Home = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <section className="">
      <TextHeader text="Launch your Design!" />
      <p className="text-balance leading-relaxed">
        Welcome to Pond.io! Use the interactive models below to simulate,
        analyze, and design wastewater treatment plant (WWTP) scenarios. Simply
        click on an available model such as MBBR or Anaerobic Digestion—to begin
        adjusting parameters and observing real-time results based on your
        inputs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-fit mt-8">
        {modelsList.map((model) => (
          <Card
            key={model.id}
            title={model.title}
            description={model.description}
            category={model.category}
            link={model.link}
            expectedResults={model.expectedResults}
            imageSrc={model.image}
            imageAlt={model.imageAlt}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
