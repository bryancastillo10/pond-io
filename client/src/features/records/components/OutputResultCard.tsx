import { useAppSelector } from "@/lib/redux/hooks";

import { renderObject } from "@/utils/renderObject";

const OutputResultCard = ({ output }: { output: Record<string, any> }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div>
      <h2 className="font-semibold mb-2">Output Results</h2>
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
