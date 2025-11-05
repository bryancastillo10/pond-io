import { useLocation, useParams, useNavigate } from "react-router-dom";

import NoSimulationFound from "@/features/records/components/NoSimulationFound";
import useSaveSimulation from "@/features/records/hooks/useSaveSimulation";

import TextHeader from "@/components/static/TextHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import InputResultCard from "@/features/records/components/InputResultCard";
import OutputResultCard from "@/features/records/components/OutputResultCard";

const SimulationResult = () => {
  const { id, name } = useParams();
  const { state } = useLocation();
  const { title, saveSimulationRecord, handleChangeTitle } =
    useSaveSimulation(name);

  const navigate = useNavigate();

  if (!state || !id) {
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
        <InputResultCard input={input} />

        <OutputResultCard output={output} />

        <Input
          label="Simulation Title"
          value={title}
          onChange={handleChangeTitle}
        />
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
        <Button
          action={() => saveSimulationRecord({ id, input, output })}
          variant="primary"
        >
          Save
        </Button>
      </div>
    </section>
  );
};

export default SimulationResult;
