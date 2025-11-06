import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/hooks";

import Button from "@/components/ui/Button";

interface NoSimulationFoundProps {
  text: "Result" | "Records";
}

const NoSimulationFound = ({ text }: NoSimulationFoundProps) => {
  const darkMode = useAppSelector((state) => state.theme.isDarkMode);

  const navigate = useNavigate();

  return (
    <section
      className={`flex flex-col gap-2 justify-center items-center w-full h-screen
          ${
            darkMode
              ? "bg-dark-background text-dark-text"
              : "bg-background text-text"
          }
      `}
    >
      <h1 className="font-semibold">
        {`No Simulation ${text === "Result" ? "Result" : "Records"} Found ☹️`}
      </h1>
      <div className="mt-4">
        <Button action={() => navigate("/model")} variant="primary">
          Go Back To Home
        </Button>
      </div>
    </section>
  );
};

export default NoSimulationFound;
