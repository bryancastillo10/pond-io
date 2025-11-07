import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useSaveSimulationMutation } from "@/features/records/api/recordsApi";
import { generateTimestamp } from "@/utils/generateTimestamp";

import { type BaseSimulationResults } from "@/features/records/api/interface";

const useSaveSimulation = (name: string | undefined) => {
  const [title, setTitle] = useState<string>(
    `${name || "model"}-${generateTimestamp()}`
  );
  const navigate = useNavigate();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const [saveRecord, { isLoading, isError }] = useSaveSimulationMutation();

  const saveSimulationRecord = async (results: BaseSimulationResults) => {
    try {
      const payload = {
        title,
        model: name || "unknown model",
        input: results.input,
        output: results.output.result,
      };

      const result = await saveRecord(payload).unwrap();

      if (result) {
        toast.success("A simulation record was saved");
      }

      navigate("/records");
    } catch (error) {
      toast.error("Failed to save the simulation");
    }
  };

  return {
    title,
    isError,
    isLoading,
    handleChangeTitle,
    saveSimulationRecord,
  };
};

export default useSaveSimulation;
