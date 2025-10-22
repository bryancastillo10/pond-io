import { useLocation, useParams } from "react-router-dom";
import TextHeader from "@/components/static/TextHeader";
import NoSimulationFound from "@/app/NoSimulationFound";

const SimulationResult = () => {
  const { name, id } = useParams();
  const { state } = useLocation();

  if (!state) {
    return <NoSimulationFound />;
  }

  const { input, output } = state;

  return (
    <div className="p-6 space-y-6">
      <TextHeader text={`Simulation Result: ${name}`} withLine />
      <p className="text-sm text-gray-500 mb-4">Result ID: {id}</p>

      <section>
        <h2 className="font-semibold mb-2">Input Parameters</h2>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          {Object.entries(input).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between py-1 border-b last:border-b-0"
            >
              <span className="font-medium capitalize text-gray-700">
                {key}
              </span>
              <span className="text-gray-900">{String(value)}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Output Results</h2>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          {Object.entries(output).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between py-1 border-b last:border-b-0"
            >
              <span className="font-medium capitalize text-gray-700">
                {key}
              </span>
              <span className="text-gray-900">{String(value)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SimulationResult;
