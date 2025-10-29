import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useSimulateMbbrMutation } from "@/features/mbbr/api/simulate";

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
  handleSimulate: () => Promise<void>;
  isError: boolean;
  isLoading: boolean;
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

  const [simulateMbbr, { isLoading, isError }] = useSimulateMbbrMutation();

  const navigate = useNavigate();
  const { name } = useParams();

  const setters = {
    infData: setInfData,
    effData: setEffData,
    firstStageData: setFirstStageData,
    secondStageData: setSecondStageData,
  };

  const mbbrInput = useMemo(
    () => ({
      flowRate: Number(infData.flowRate),
      infBOD: Number(infData.infBOD),
      infTKN: Number(infData.infTKN),
      targetEffPercBOD: Number(effData.effPercBODRemoval),
      targetEffPercTKN: Number(effData.effPercTKNRemoval),
      firstStage: {
        salr: Number(firstStageData.salr),
        carrierFill: Number(firstStageData.carrierFill),
        waterLevel: Number(firstStageData.waterLevel),
        carrierSurfaceArea: Number(firstStageData.carrierSurfaceArea),
        lengthWidthRatio: Number(firstStageData.lengthWidthRatio),
      },
      secondStage: {
        salr: Number(secondStageData.salr),
        carrierFill: Number(secondStageData.carrierFill),
        waterLevel: Number(secondStageData.waterLevel),
        carrierSurfaceArea: Number(secondStageData.carrierSurfaceArea),
        lengthWidthRatio: Number(secondStageData.lengthWidthRatio),
      },
    }),
    [infData, effData, firstStageData, secondStageData]
  );

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

  const handleSimulate = async () => {
    try {
      const result = await simulateMbbr(mbbrInput).unwrap();

      const resId = uuidv4();

      if (result) {
        toast.success(result.message);
      }

      navigate(`/model/${name}/result/${resId}`, {
        state: {
          model: name,
          id: resId,
          input: mbbrInput,
          output: result,
        },
      });
    } catch (error) {
      toast.error(`Failed to simulate ${name?.toUpperCase()}`);
    }
  };

  const contextValues: MBBRFormContextType = {
    infData,
    effData,
    firstStageData,
    secondStageData,
    mbbrInput,
    formCompletion,
    isLoading,
    isError,
    handleChange,
    handleSave,
    handleSimulate,
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
