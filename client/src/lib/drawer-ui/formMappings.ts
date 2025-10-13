import MBBRInfluentForm from "@/features/mbbr/components/MBBRInfluentForm";
import MBBRFirstStageForm from "@/features/mbbr/components/MBBRFirstStageForm";
import MBBRSecondStageForm from "@/features/mbbr/components/MBBRSecondStageForm";
import MBBREffluentForm from "@/features/mbbr/components/MBBREffluentForm";

export const drawerForms: Record<string, React.ComponentType<any>> = {
  MBBRInfluentForm,
  MBBRFirstStageForm,
  MBBRSecondStageForm,
  MBBREffluentForm,
};
