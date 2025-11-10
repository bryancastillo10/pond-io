import { useAppSelector } from "@/lib/redux/hooks";

import { TextCursorInput } from "lucide-react";
import { renderObject } from "@/utils/renderObject";

const InputResultCard = ({ input }: { input: Record<string, any> }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className={`${isDarkMode ? "text-background" : "text-text"}`}>
      <div className="flex items-center gap-2 my-2 text-background">
        <TextCursorInput />
        <h2 className="font-semibold">Input Parameters</h2>
      </div>
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
