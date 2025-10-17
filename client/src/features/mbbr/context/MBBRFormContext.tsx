import { createContext, useContext, useMemo, useState } from "react";

import { toast } from "sonner";

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

type FormCompletion<T> = {
  infData: T;
  firstStageData: T;
  secondStageData: T;
  effData: T;
};

interface MBBRFormContextType {
  infData: InfData;
  effData: EffData;
  firstStageData: StageData;
  secondStageData: StageData;
  mbbrInput: Record<string, any>;
  formCompletion: FormCompletion<boolean>;
  handleChange: <
    T extends "infData" | "effData" | "firstStageData" | "secondStageData",
    K extends keyof (InfData & EffData & StageData)
  >(
    group: T,
    field: K
  ) => (value: string) => void;
  handleSave: (
    group: keyof FormCompletion<boolean>,
    handleCloseDrawer: () => void
  ) => void;
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

  const isCompleted = (data: Record<string, string>) =>
    Object.values(data).every((val) => val.trim() !== "");

  const formCompletion = useMemo(
    () => ({
      infData: isCompleted(infData),
      firstStageData: isCompleted(firstStageData),
      secondStageData: isCompleted(secondStageData),
      effData: isCompleted(effData),
    }),
    [infData, firstStageData, secondStageData, effData]
  );

  const handleSave = (
    group: keyof typeof formCompletion,
    handleCloseDrawer: () => void
  ) => {
    if (formCompletion[group]) {
      handleCloseDrawer();
    } else {
      toast.warning("Please fill up the form");
    }
  };

  const contextValues: MBBRFormContextType = {
    infData,
    effData,
    firstStageData,
    secondStageData,
    mbbrInput,
    formCompletion,
    handleChange,
    handleSave,
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
