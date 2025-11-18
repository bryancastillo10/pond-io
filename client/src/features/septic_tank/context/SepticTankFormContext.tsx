import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useSimulateSepticTankMutation } from "@/features/septic_tank/api/simulate";

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
  handleSimulate: () => Promise<void>;
  isError: boolean;
  isLoading: boolean;
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

  const [simulateSepticTank, { isLoading, isError }] =
    useSimulateSepticTankMutation();

  const navigate = useNavigate();
  const { name } = useParams();

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

  const handleSimulate = async () => {
    try {
      const result = await simulateSepticTank(septicTankInput).unwrap();

      const resId = uuidv4();

      if (result) {
        toast.success(result.message);
      }

      navigate(`/model/${name}/result/${resId}`, {
        state: {
          model: name,
          id: resId,
          input: septicTankInput,
          output: result,
        },
      });
    } catch (error) {
      toast.error(`Failed to simulate ${name?.toUpperCase()}`);
    }
  };

  const contextValues: SepticTankFormContextType = {
    operationsData,
    sludgeSpecs,
    septicTankInput,
    formCompletion,
    isError,
    isLoading,
    handleChange,
    handleCancel,
    handleSave,
    handleSimulate,
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
