import { Outlet } from "react-router-dom";

import { useGetSimulationQuery } from "@/features/records/api/recordsApi";
import LoadingRecords from "@/features/records/components/LoadingRecords";
import NoSimulationFound from "@/features/records/components/NoSimulationFound";

import TextHeader from "@/components/static/TextHeader";

const SimulationRecords = () => {
  const { data, isLoading, isError } = useGetSimulationQuery();

  if (isLoading) {
    return <LoadingRecords isLoading={isLoading} />;
  }

  if (isError || !data) {
    return <NoSimulationFound text="Records" />;
  }

  return (
    <div>
      <TextHeader text="Simulation Records" withLine />

      <div className="my-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.records.map((record: any) => (
          <button
            key={record.id}
            onClick={() => console.log("Clicked:", record.id)}
            className="w-full text-left border border-gray-300 rounded-xl bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200"
          >
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {record.title || "Untitled Simulation"}
            </h2>

            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Model:</span>
              <span>{record.model || "N/A"}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default SimulationRecords;
