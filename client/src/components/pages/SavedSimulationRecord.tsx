import { useAppSelector } from "@/lib/redux/hooks";
import { useParams, useOutletContext } from "react-router-dom";

import { type GetSimulationRecordsResponse } from "@/features/records/api/interface";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mt-4">
          <h3 className="font-semibold mb-1">Input Data:</h3>
          <pre className="text-sm bg-black/10 p-2 rounded-md overflow-auto">
            {JSON.stringify(record.input, null, 2)}
          </pre>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-1">Output Data:</h3>
          <pre className="text-sm bg-black/10 p-2 rounded-md overflow-auto">
            {JSON.stringify(record.output, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SavedSimulationRecord;
