import NoSimulationFound from "@/app/NoSimulationFound";

import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/hooks";

import TextHeader from "@/components/static/TextHeader";
import Button from "@/components/ui/Button";
import { renderObject } from "@/utils/renderObject";

const SimulationResult = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const { name } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return <NoSimulationFound />;
  }

  const { input, output } = state;

  return (
    <section className="p-6">
      <div className="">
        <TextHeader
          text={`Simulation Result: ${
            name?.toUpperCase() || "Unknown Model Name"
          }`}
          withLine
        />
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
      <div className="mt-10 flex w-full justify-center lg:mt-8 lg:justify-end items-center gap-4">
        <Button
          action={() => {
            navigate(`/model/${name}`);
          }}
          variant="outline"
        >
          Go Back
        </Button>
        <Button variant="primary">Save</Button>
      </div>
    </section>
  );
};

export default SimulationResult;
