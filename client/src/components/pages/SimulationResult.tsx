import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/hooks";

import TextHeader from "@/components/static/TextHeader";
import { renderObject } from "@/utils/renderObject";
import NoSimulationFound from "@/app/NoSimulationFound";

const SimulationResult = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const { name } = useParams();
  const { state } = useLocation();

  if (!state) {
    return <NoSimulationFound />;
  }

  const { input, output } = state;

  return (
    <div className="p-6">
      <div className="">
        <TextHeader
          text={`Simulation Result: ${
            name?.toUpperCase() || "Unknown Model Name"
          }`}
          withLine
        />
      </div>
      <section className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold mb-2">Input Parameters</h2>
          <div
            className={`p-4 rounded-lg border border-text ${
              isDarkMode ? "bg-accent" : "bg-gray-50"
            }`}
          >
            {renderObject(input)}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Output Results</h2>
          <div
            className={`p-4 rounded-lg border border-text ${
              isDarkMode ? "bg-primary" : "bg-gray-50"
            }`}
          >
            {output?.result
              ? renderObject(output.result)
              : renderObject(output)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimulationResult;
