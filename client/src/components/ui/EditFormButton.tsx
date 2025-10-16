import Button from "@/components/ui/Button";
import { Pencil, CircleAlert, CircleCheck } from "lucide-react";

import { useAppSelector } from "@/lib/redux/hooks";

interface EditFormButtonProps {
  title?: string;
  position: string;
  isFormCompleted?: boolean;
  openDrawer: () => void;
}

const EditFormButton = ({
  title,
  openDrawer,
  isFormCompleted,
  position,
}: EditFormButtonProps) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className={`absolute ${position}`}>
      {title && <p className="my-0.5 text-sm">{title}</p>}
      <div className="flex gap-1">
        <Button action={openDrawer} variant="outline">
          <Pencil size={18} />
        </Button>
        {isFormCompleted ? (
          <CircleCheck color={isDarkMode ? "#aaf0d1" : "#004a00"} size={14} />
        ) : (
          <CircleAlert color={isDarkMode ? "#ffff49" : "#d3d300"} size={14} />
        )}
      </div>
    </div>
  );
};

export default EditFormButton;
