import { useState } from "react";

import { generateTimestamp } from "@/utils/generateTimestamp";

const useSaveSimulation = (name: string | undefined) => {
  const [title, setTitle] = useState<string>(
    `${name || "model"}-${generateTimestamp()}`
  );

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return {
    title,
    handleChangeTitle,
  };
};

export default useSaveSimulation;
