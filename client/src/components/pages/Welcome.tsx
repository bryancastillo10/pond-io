import Button from "@/components/ui/Button";
import { ArrowRightToLine } from "lucide-react";
import { Link } from "react-router-dom";
import FullWaterWave from "@/components/static/FullWaterWave";

const Welcome = () => {
  return (
    <div className="w-full h-screen relative z-50 bg-dark-background text-dark-primary">
      <div className="flex flex-col h-screen justify-center gap-2 items-center">
        <h1 className="text-5xl font-semibold font-heading italic">Pond.io</h1>
        <p className="font-body text-background text-xl">
          An open-source wastewater treatment plant simulator
        </p>
        <div className="mt-6">
          <Button>
            <Link className="flex items-center gap-4" to="/model">
              Get Started <ArrowRightToLine size="24" />
            </Link>
          </Button>
        </div>
      </div>
      <FullWaterWave />
    </div>
  );
};

export default Welcome;
