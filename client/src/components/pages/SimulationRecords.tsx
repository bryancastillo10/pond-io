import { useGetSimulationQuery } from "@/features/records/api/recordsApi";

const SimulationRecords = () => {
  const {
    data: simulationRecords,
    isLoading,
    isError,
  } = useGetSimulationQuery();

  if (isLoading) {
    return (
      <div className="">
        <p>Loading Simulation Records</p>
      </div>
    );
  }

  if (isError || !simulationRecords) {
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
        {simulationRecords?.records.map((record) => (
          <p key={record.id}>{record.title}</p>
        ))}
      </div>
    </div>
  );
};

export default SimulationRecords;
