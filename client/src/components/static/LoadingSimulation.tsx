import { GridLoader } from "react-spinners";
import { useAppSelector } from "@/lib/redux/hooks";

const LoadingSimulation = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className="relative rounded-lg border overflow-x-scroll shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <GridLoader size="28" color={isDarkMode ? "#0b7ada" : "#2593f4"} />
    </div>
  );
};

export default LoadingSimulation;
