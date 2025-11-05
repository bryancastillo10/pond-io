import { useGetSimulationQuery } from "@/features/records/api/recordsApi";
import LoadingRecords from "@/features/records/components/LoadingRecords";

const SimulationRecords = () => {
  const { data, isLoading, isError } = useGetSimulationQuery();

  if (isLoading) {
    return <LoadingRecords isLoading={isLoading} />;
  }

  if (isError || !data) {
    return (
      <div className="">
        <p>Error: No Simulation Records Recovered</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Simulation Records Here</h1>

      <div>
        {data?.records.map((record) => (
          <p key={record.id}>{record.title}</p>
        ))}
      </div>
    </div>
  );
};

export default SimulationRecords;
