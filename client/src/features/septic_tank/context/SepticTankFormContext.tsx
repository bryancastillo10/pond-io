import { createContext, useContext, useMemo, useState } from "react";
import { toast } from "sonner";

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
  septicTankInput: Record<string, any>;
  formCompletion: FormCompletion<boolean>;
  handleChange: <
    T extends "operations" | "sludgeSpecs",
    K extends keyof (OperationData & SludgeSpecsData)
  >(
    group: T,
    field: K
  ) => (value: string) => void;
  handleCancel: (
    group: "operations" | "sludgeSpecs",
    handleCloseDrawer: () => void
  ) => void;
  handleSave: (
    group: keyof FormCompletion<boolean>,
    handleCloseDrawer: () => void
  ) => void;
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

  const septicTankInput = useMemo(
    () => ({
      numberOfUsers: Number(operationsData.numberOfUsers),
      waterConsumption: Number(operationsData.waterConsumption),
      waterDepth: Number(operationsData.waterDepth),
      allowanceDepth: Number(operationsData.allowanceDepth),
      sludgeVolume: {
        desludgingPeriod: Number(sludgeSpecs.desludgingPeriod),
        accumulationRate: Number(sludgeSpecs.accumulationRate),
        sizingFactor: Number(sludgeSpecs.sizingFactor),
      },
    }),
    [operationsData, sludgeSpecs]
  );

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
    [operationsData, sludgeSpecs]
  );

  const handleCancel = (
    group: keyof typeof setters,
    handleCloseDrawer: () => void
  ) => {
    if (group === "operations") {
      setOperationsData(initialOperation);
    } else if (group === "sludgeSpecs") {
      setSludgeSpecs(initialSludgeSpecs);
    } else {
      console.warn(`No initial value found for group ${group}`);
    }

    handleCloseDrawer();
  };

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

  const contextValues: SepticTankFormContextType = {
    operationsData,
    sludgeSpecs,
    septicTankInput,
    formCompletion,
    handleChange,
    handleCancel,
    handleSave,
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
