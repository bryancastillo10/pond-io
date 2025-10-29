import { createContext, useContext, useMemo, useState } from "react";

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

  const setters = {
    parameters: setParamaters,
    targetEffluent: setTragetEffluent,
  };

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

  const contextValues: UASBFormContextType = {
    parameters,
    targetEffluent,
    formCompletion,
    handleChange,
    handleSave,
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
