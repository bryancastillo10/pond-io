import { createContext, useContext, useState } from "react";

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

interface MBBRFormContextType {
  infData: InfData;
  effData: EffData;
  firstStageData: StageData;
  secondStageData: StageData;
  mbbrInput: Record<string, any>;
  handleChange: <
    T extends "infData" | "effData" | "firstStageData" | "secondStageData",
    K extends keyof (InfData & EffData & StageData)
  >(
    group: T,
    field: K
  ) => (value: string) => void;
}

const MBBRFormContext = createContext<MBBRFormContextType | null>(null);

export const MBBRFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    secondStage: { ...secondStageData },
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

  const contextValues: MBBRFormContextType = {
    infData,
    effData,
    firstStageData,
    secondStageData,
    mbbrInput,
    handleChange,
  };

  return (
    <MBBRFormContext.Provider value={contextValues}>
      {children}
    </MBBRFormContext.Provider>
  );
};

export const useMBBRFormContext = () => {
  const context = useContext(MBBRFormContext);
  if (!context) {
    throw new Error(
      "useMBBRFormContext must be used within MBBRFormContextProvider"
    );
  }
  return context;
};
