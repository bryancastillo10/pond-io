import { useAppSelector } from "@/lib/redux/hooks";

import { TextCursorInput } from "lucide-react";
import { renderObject } from "@/utils/renderObject";

interface InputCardProps {
  input: Record<string, any>;
  headerTextColor?: string;
}

const InputResultCard = ({
  input,
  headerTextColor = "text-background",
}: InputCardProps) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  let finalHeaderTextColor = headerTextColor;

  if (headerTextColor === "text-primary") {
    finalHeaderTextColor = isDarkMode ? "text-secondary" : "text-primary";
  }

  return (
    <div className={`${isDarkMode ? "text-background" : "text-text"}`}>
      <div className={`flex items-center gap-2 my-2 ${finalHeaderTextColor}`}>
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
