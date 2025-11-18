import { MBBRFormContextProvider } from "@/features/mbbr/context/MBBRFormContext";
import { SepticTankFormContextProvider } from "@/features/septic_tank/context/SepticTankFormContext";
import { UASBFormContextProvider } from "@/features/uasb/context/UASBFormContext";

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MBBRFormContextProvider>
      <SepticTankFormContextProvider>
        <UASBFormContextProvider>{children}</UASBFormContextProvider>
      </SepticTankFormContextProvider>
    </MBBRFormContextProvider>
  );
};

export default FormProvider;
