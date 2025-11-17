import MBBRInfluentForm from "@/features/mbbr/components/MBBRInfluentForm";
import MBBRFirstStageForm from "@/features/mbbr/components/MBBRFirstStageForm";
import MBBRSecondStageForm from "@/features/mbbr/components/MBBRSecondStageForm";
import MBBREffluentForm from "@/features/mbbr/components/MBBREffluentForm";

import UASBOperationParameters from "@/features/uasb/components/UASBOperationParameters";
import UASBEffluentAndGas from "@/features/uasb/components/UASBEffluentAndGas";

import SepticTankWaterQualityForm from "@/features/septic_tank/components/SepticTankWaterQualityForm";
import SepticTankSludgeParameterForm from "@/features/septic_tank/components/SepticTankSludgeParameterForm";

export const drawerForms: Record<string, React.ComponentType<any>> = {
  MBBRInfluentForm,
  MBBRFirstStageForm,
  MBBRSecondStageForm,
  MBBREffluentForm,

  UASBOperationParameters,
  UASBEffluentAndGas,

  SepticTankWaterQualityForm,
  SepticTankSludgeParameterForm,
};
