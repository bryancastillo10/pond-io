import { MBBRFormContextProvider } from "@/features/mbbr/context/MBBRFormContext";
import { UASBFormContextProvider } from "@/features/uasb/context/UASBFormContext";

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MBBRFormContextProvider>
      <UASBFormContextProvider>{children}</UASBFormContextProvider>
    </MBBRFormContextProvider>
  );
};

export default FormProvider;
