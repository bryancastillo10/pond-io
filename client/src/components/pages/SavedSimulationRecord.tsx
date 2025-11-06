import { useAppSelector } from "@/lib/redux/hooks";
import { useParams } from "react-router-dom";

const SavedSimulationRecord = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const { id } = useParams<{ id: string }>();

  return (
    <div
      className={`bg-gradient-to-b flex justify-center items-center ${
        isDarkMode
          ? "from-dark-secondary to-dark-accent text-dark-text"
          : "from-primary to-accent text-background"
      } py-6 px-4 rounded-md`}
    >
      <p className="">Record ID: {id}</p>
    </div>
  );
};

export default SavedSimulationRecord;
