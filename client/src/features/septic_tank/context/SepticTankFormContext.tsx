import { createContext, useContext, useMemo, useState } from "react";

const initialSludgeSpecs = {
  desludgingPeriod: "",
  accumulationRate: "",
  sizingFactor: "",
};

const initialOperation = {
  numberOfUsers: "",
  waterConsumption: "",
  waterDepth: "",
  allowanceDepth: "",
};

type OperationData = typeof initialOperation;
type SludgeSpecsData = typeof initialSludgeSpecs;

type FormCompletion<T> = {
  operationsData: T;
  sludgeSpecsData: T;
};

interface SepticTankFormContextType {
  operationsData: OperationData;
  sludgeSpecs: SludgeSpecsData;
  formCompletion: FormCompletion<boolean>;
  handleChange: <
    T extends "operations" | "sludgeSpecs",
    K extends keyof (OperationData & SludgeSpecsData)
  >(
    group: T,
    field: K
  ) => (value: string) => void;
}

const SepticTankFormContext = createContext<SepticTankFormContextType | null>(
  null
);

export const SepticTankFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [operationsData, setOperationsData] = useState(initialOperation);
  const [sludgeSpecs, setSludgeSpecs] = useState(initialSludgeSpecs);

  const setters = {
    operations: setOperationsData,
    sludgeSpecs: setSludgeSpecs,
  };

  const handleChange =
    <
      T extends keyof typeof setters,
      K extends keyof (OperationData & SludgeSpecsData)
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
      operationsData: isCompleted(operationsData),
      sludgeSpecsData: isCompleted(sludgeSpecs),
    }),
    []
  );

  const contextValues: SepticTankFormContextType = {
    operationsData,
    sludgeSpecs,
    handleChange,
    formCompletion,
  };

  return (
    <SepticTankFormContext.Provider value={contextValues}>
      {children}
    </SepticTankFormContext.Provider>
  );
};

export const useSepticTankFormContext = () => {
  const context = useContext(SepticTankFormContext);

  if (!context) {
    throw new Error(
      "useSepticTankFormContext must be used within SepticTankFormContextProvider"
    );
  }

  return context;
};
