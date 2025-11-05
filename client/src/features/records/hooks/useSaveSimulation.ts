import { useState } from "react";

import { generateTimestamp } from "@/utils/generateTimestamp";
import { toast } from "sonner";

import { type BaseSimulationResults } from "@/features/records/api/interface";

const useSaveSimulation = (name: string | undefined) => {
  const [title, setTitle] = useState<string>(
    `${name || "model"}-${generateTimestamp()}`
  );

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const saveSimulationRecord = async (results: BaseSimulationResults) => {
    try {
      const payload = {
        id: results.id,
        title,
        model: name,
        input: results.input,
        output: results.output.result,
      };

      console.log(payload);

      toast.success("A simulation record was saved");
    } catch (error) {
      toast.error("Failed to save the simulation");
    }
  };

  return {
    title,
    handleChangeTitle,
    saveSimulationRecord,
  };
};

export default useSaveSimulation;
