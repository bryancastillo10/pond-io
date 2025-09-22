import { useParams } from "react-router-dom";
import {
  MbbrSimulation,
  SepticTankSimulation,
  AdSimulation,
  GritChamberSimulation,
} from "../models/Models";

const modelComponents: Record<string, React.JSX.Element> = {
  mbbr: <MbbrSimulation />,
  "septic-tank": <SepticTankSimulation />,
  ad: <AdSimulation />,
  "grit-chamber": <GritChamberSimulation />,
};

const ModelSimulation = () => {
  const { name } = useParams<{ name: string }>();

  const renderComponent = name ? modelComponents[name] : null;

  if (!renderComponent) {
    return <div>⚠️ Model "{name}" not found</div>;
  }

  return <div>{renderComponent}</div>;
};

export default ModelSimulation;
