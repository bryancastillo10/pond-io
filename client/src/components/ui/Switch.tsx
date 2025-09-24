import { Sun, Moon } from "lucide-react";

interface SwitchProps {
  isOn: boolean;
  toggleSwitch: () => void;
}

const Switch = ({ isOn, toggleSwitch }: SwitchProps) => {
  return (
    <div
      className={`h-6 w-14 rounded-3xl shadow-lg  cursor-pointer relative
         bg-secondary
          `}
      onClick={toggleSwitch}
    >
      <div
        className={`absolute top-1 transform transition-all left-2 size-4 rounded-full duration-300 ease-in-out hover:animate-pulse
                    ${
                      isOn
                        ? "translate-x-6 bg-background"
                        : "translate-x-0 bg-primary"
                    }
              `}
      />
      {isOn ? (
        <Sun
          size="16"
          className="absolute left-2 top-1 text-dark-background duration-300 ease-in-out"
        />
      ) : (
        <Moon
          size="16"
          className="absolute right-2 top-1 text-primary duration-300 ease-in-out"
        />
      )}
    </div>
  );
};

export default Switch;
