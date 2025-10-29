import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useSimulateUasbMutation } from "@/features/uasb/api/simulate";

import { toast } from "sonner";

const initialOperationalData = {
  flowRate: "",
  infCOD: "",
  olr: "",
  upflowVelocity: "",
};

const initialEffluentAndGasData = {
  effPercCODRemoval: "",
  methaneYield: "",
  methaneFraction: "",
};

type OperationData = typeof initialOperationalData;
type EffluentAndGasData = typeof initialEffluentAndGasData;

type FormCompletion<T> = {
  parameters: T;
  targetEffluent: T;
};

interface UASBFormContextType {
  parameters: OperationData;
  targetEffluent: EffluentAndGasData;
  formCompletion: FormCompletion<boolean>;
  handleChange: <
    T extends "parameters" | "targetEffluent",
    K extends keyof (OperationData & EffluentAndGasData)
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

const UASBFormContext = createContext<UASBFormContextType | null>(null);

export const UASBFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [parameters, setParamaters] = useState(initialOperationalData);
  const [targetEffluent, setTragetEffluent] = useState(
    initialEffluentAndGasData
  );

  const [simulateUasb, { isLoading, isError }] = useSimulateUasbMutation();

  const navigate = useNavigate();
  const { name } = useParams();

  const setters = {
    parameters: setParamaters,
    targetEffluent: setTragetEffluent,
  };

  const uasbInput = useMemo(
    () => ({
      parameters: {
        flowRate: Number(parameters.flowRate),
        infCOD: Number(parameters.infCOD),
        olr: Number(parameters.olr),
        upflowVelocity: Number(parameters.upflowVelocity),
      },
      targetEffluent: {
        codRemoval: Number(targetEffluent.effPercCODRemoval),
        methaneYield: Number(targetEffluent.methaneYield),
        methaneFraction: Number(targetEffluent.methaneFraction),
      },
    }),
    []
  );

  const handleChange =
    <
      T extends keyof typeof setters,
      K extends keyof (OperationData & EffluentAndGasData)
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
      parameters: isCompleted(parameters),
      targetEffluent: isCompleted(targetEffluent),
    }),
    [parameters, targetEffluent]
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
      const result = await simulateUasb(uasbInput).unwrap();

      const resId = uuidv4();

      navigate(`/model/${name}/result/${resId}`, {
        state: {
          model: name,
          id: resId,
          input: uasbInput,
          output: result,
        },
      });
    } catch (error) {
      toast.error(`Failed to simulate ${name}`);
    }
  };

  const contextValues: UASBFormContextType = {
    parameters,
    targetEffluent,
    formCompletion,
    isLoading,
    isError,
    handleChange,
    handleSave,
    handleSimulate,
  };

  return (
    <UASBFormContext.Provider value={contextValues}>
      {children}
    </UASBFormContext.Provider>
  );
};

export const useUASBFormContext = () => {
  const context = useContext(UASBFormContext);
  if (!context) {
    throw new Error(
      "useUASBFormContext must be used within UASBFormContextProvider"
    );
  }
  return context;
};
