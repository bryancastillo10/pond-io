import { useAppSelector } from "@/lib/redux/hooks";

import { renderObject } from "@/utils/renderObject";

const InputResultCard = ({ input }: { input: Record<string, any> }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div>
      <h2 className="font-semibold mb-2">Input Parameters</h2>
      <div
        className={`p-4 rounded-lg border border-text ${
          isDarkMode ? "bg-accent" : "bg-gray-50"
        }`}
      >
        {renderObject(input)}
      </div>
    </div>
  );
};

export default InputResultCard;
