import { useAppSelector } from "@/lib/redux/hooks";

import { AreaChart } from "lucide-react";
import { renderObject } from "@/utils/renderObject";

const OutputResultCard = ({ output }: { output: Record<string, any> }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className={`${isDarkMode ? "text-background" : "text-text"}`}>
      <div className="flex items-center gap-2 my-2 text-background">
        <AreaChart />
        <h2 className="font-semibold">Output Results</h2>
      </div>
      <div
        className={`p-4 rounded-lg border border-text ${
          isDarkMode ? "bg-primary" : "bg-gray-50"
        }`}
      >
        {output?.result ? renderObject(output.result) : renderObject(output)}
      </div>
    </div>
  );
};

export default OutputResultCard;
