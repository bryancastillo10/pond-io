import { MBBRFormContextProvider } from "@/features/mbbr/context/MBBRFormContext";

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  return <MBBRFormContextProvider>{children}</MBBRFormContextProvider>;
};

export default FormProvider;
