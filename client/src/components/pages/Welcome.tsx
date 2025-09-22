import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="w-full h-screen bg-dark-background text-dark-primary">
      <div className="flex flex-col h-screen justify-center gap-2 items-center">
        <h1 className="text-5xl font-semibold font-heading italic">Pond.io</h1>
        <p className="font-body text-background text-xl">
          An open-source wastewater treatment plant simulator
        </p>
        <div className="mt-6">
          <Button>
            <Link to="/model">Get Started ➡️</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
