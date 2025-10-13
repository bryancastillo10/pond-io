import { useState } from "react";

const initialInfData = {
  flowRate: "",
  infBOD: "",
  infTKN: "",
};

const initialEffPercData = {
  effPercBODRemoval: "",
  effPercTKNRemoval: "",
};

const mbbrStageData = {
  salr: "",
  carrierFill: "",
  waterLevel: "",
  carrierSurfaceArea: "",
  lengthWidthRatio: "",
};

type InfData = typeof initialInfData;
type EffData = typeof initialEffPercData;
type StageData = typeof mbbrStageData;

const useMBBRForm = () => {
  const [infData, setInfData] = useState(initialInfData);
  const [effData, setEffData] = useState(initialEffPercData);
  const [firstStageData, setFirstStageData] = useState(mbbrStageData);
  const [secondStageData, setSecondStageData] = useState(mbbrStageData);

  const setters = {
    infData: setInfData,
    effData: setEffData,
    firstStageData: setFirstStageData,
    secondStageData: setSecondStageData,
  };

  const mbbrInput = {
    ...infData,
    ...effData,
    firstStage: { ...firstStageData },
    secondStageData: { ...secondStageData },
  };

  const handleChange =
    <
      T extends keyof typeof setters,
      K extends keyof (InfData & EffData & StageData)
    >(
      group: T,
      field: K
    ) =>
    (value: string) => {
      setters[group]((prev: any) => ({ ...prev, [field]: value }));
    };

  return {
    infData,
    effData,
    firstStageData,
    secondStageData,
    mbbrInput,
    handleChange,
  };
};

export default useMBBRForm;
