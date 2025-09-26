import useMBBRDiagram from "@/features/mbbr/hooks/useMBBRDiagram";
import Button from "@/components/ui/Button";
import { Pencil, Play } from "lucide-react";

import useDrawer from "@/lib/drawer-ui/useDrawer";

const Diagram = () => {
  const { handleOpenDrawer } = useDrawer();

  const { mbbrRef } = useMBBRDiagram();

  const openFirstStageForm = () => {
    handleOpenDrawer("BOD Removal Unit", "FirstStageForm");
  };

  return (
    <div className="relative rounded-lg border shadow-md my-2 w-full h-[75vh] mx-auto flex justify-center items-center">
      <div className="absolute top-4 left-3 border border-primary px-2 py-1 w-[250px] h-[135px] rounded-lg shadow-md">
        Influent Form
        <p>
          m<sup>3</sup>/ day
        </p>
      </div>

      <div className="absolute top-20 left-70">
        <Button action={() => openFirstStageForm()} variant="outline">
          <Pencil size={18} />
        </Button>
      </div>

      <div className="absolute top-20 left-140">
        <Button variant="outline">
          <Pencil size={18} />
        </Button>
      </div>

      <canvas ref={mbbrRef} width={1000} height={450} />

      <div className="absolute bottom-4 right-3 border border-primary px-2 py-1 w-[250px] h-[110px] rounded-lg shadow-md">
        Effluent Form
        <p>mg/ L</p>
      </div>

      <div className="absolute right-5 top-4">
        <Button variant="primary">
          <div className="flex items-center gap-2">
            <Play /> Start
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Diagram;
