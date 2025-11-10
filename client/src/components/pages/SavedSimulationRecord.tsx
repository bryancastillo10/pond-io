import { useAppSelector } from "@/lib/redux/hooks";
import { useParams, useOutletContext } from "react-router-dom";

import { type GetSimulationRecordsResponse } from "@/features/records/api/interface";
import InputResultCard from "@/features/records/components/InputResultCard";
import OutputResultCard from "@/features/records/components/OutputResultCard";

const SavedSimulationRecord = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const { id } = useParams<{ id: string }>();
  const { records } = useOutletContext<GetSimulationRecordsResponse>();

  const record = records.find((r) => r.id === id);

  if (!record) {
    return (
      <div className="text-gray-500 text-center italic py-6">
        Record not found.
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-b ${
        isDarkMode
          ? "from-dark-secondary to-dark-accent text-dark-text"
          : "from-primary to-accent text-background"
      } py-6 px-4 rounded-md`}
    >
      <h2 className="text-xl font-semibold mb-2">{record.title}</h2>
      <p className="mb-1 font-medium">Model: {record.model.toUpperCase()}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
        <InputResultCard input={record.input} />
        <OutputResultCard output={record.output} />
      </div>
    </div>
  );
};

export default SavedSimulationRecord;
