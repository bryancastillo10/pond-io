import { useParams } from "react-router-dom";
import {
  MbbrSimulation,
  AdSimulation,
  SepticTankSimulation,
  UasbSimulation,
} from "@/components/models";

const modelComponents: Record<string, React.JSX.Element> = {
  mbbr: <MbbrSimulation />,
  "septic-tank": <SepticTankSimulation />,
  ad: <AdSimulation />,
  uasb: <UasbSimulation />,
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
