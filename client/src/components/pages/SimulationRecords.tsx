import { useNavigate, Outlet } from "react-router-dom";

import { useGetSimulationQuery } from "@/features/records/api/recordsApi";
import LoadingRecords from "@/features/records/components/LoadingRecords";
import NoSimulationFound from "@/features/records/components/NoSimulationFound";

import TextHeader from "@/components/static/TextHeader";

const SimulationRecords = () => {
  const navigate = useNavigate();
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

      <div className="my-4 overflow-x-scroll py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.records.map((record: any) => (
          <button
            key={record.id}
            onClick={() => navigate(`/records/${record.id}`)}
            className="w-full text-left border cursor-pointer border-gray-300 rounded-xl  p-4 shadow-sm hover:shadow-md hover:border-blue-accent transition-all duration-200"
          >
            <h2 className="text-lg font-semibold truncate">
              {record.title || "Untitled Simulation"}
            </h2>

            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="font-medium">Model:</span>
              <span>{record.model || "N/A"}</span>
            </div>
          </button>
        ))}
      </div>

      <Outlet context={{ records: data.records }} />
    </div>
  );
};

export default SimulationRecords;
