import { useState } from "react";

interface NumberInputProps {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  unit: string;
  disabled: boolean;
  decimals?: number;
  min?: number;
  max?: number;
  helperText?: string;
}

const NumberInput = ({
  label,
  value,
  onChange,
  unit,
  disabled,
  decimals = 2,
  min,
  max,
  helperText,
}: NumberInputProps) => {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      onChange("");
      setError("");
      return;
    }

    const decimalPattern =
      decimals > 0 ? `^\\d*\\.?\\d{0,${decimals}}$` : `^\\d*$`;

    const regex = new RegExp(decimalPattern);

    if (regex.test(inputValue)) {
      onChange(inputValue);

      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        if (min !== undefined && numValue < min) {
          setError(`Value must be at least ${min}`);
        } else if (max !== undefined && numValue > max) {
          setError(`Value must be at most ${max}`);
        } else {
          setError("");
        }
      }
    }
  };

  const handleBlur = () => {
    if (value && value !== "") {
      const numValue = parseFloat(value.toString());
      if (!isNaN(numValue)) {
        const formatted =
          decimals > 0
            ? numValue.toFixed(decimals)
            : Math.round(numValue).toString();
        onChange(formatted);
      }
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1" htmlFor="">
        {label}
      </label>
      <div className="relative w-fit">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`px-3 py-2 border rounded-lg focus:outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary
			min-w-sm
			${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-background"}
            ${unit ? "pr-16" : "pr-3"}  
			`}
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 text-sm font-medium">{unit}</span>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          className={`mt-1 text-sm ${
            error ? "text-rose-500" : "text-gray-500"
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default NumberInput;
