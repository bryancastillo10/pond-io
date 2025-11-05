import { RiseLoader } from "react-spinners";
import { useAppSelector } from "@/lib/redux/hooks";

interface LoadingRecordsProps {
  isLoading: boolean;
}

const LoadingRecords = ({ isLoading }: LoadingRecordsProps) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <RiseLoader
        loading={!isLoading}
        size={24}
        color={isDarkMode ? "#0b7ada" : "#2593f4"}
      />
    </div>
  );
};

export default LoadingRecords;
