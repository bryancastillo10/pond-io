import Button from "@/components/ui/Button";
import { Pencil, CircleAlert, CircleCheck } from "lucide-react";

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
  return (
    <div className={`absolute ${position}`}>
      {title && <p className="my-0.5 text-sm">{title}</p>}
      <div className="flex gap-1">
        <Button action={openDrawer} variant="outline">
          <Pencil size={18} />
        </Button>
        {isFormCompleted ? (
          <CircleCheck color="#0b7ada" size={14} />
        ) : (
          <CircleAlert color="#0b7ada" size={14} />
        )}
      </div>
    </div>
  );
};

export default EditFormButton;
