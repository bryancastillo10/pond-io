import { Play } from "lucide-react";
import Button from "@/components/ui/Button";

interface StartSimulationButtonProps {
  handleStart: () => void;
}

const StartSimulationButton = ({ handleStart }: StartSimulationButtonProps) => {
  return (
    <div className="absolute right-5 top-4">
      <Button variant="primary" action={handleStart}>
        <div className="flex items-center gap-2">
          <Play /> Start
        </div>
      </Button>
    </div>
  );
};

export default StartSimulationButton;
