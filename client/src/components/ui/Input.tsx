import { Info, CircleX } from "lucide-react";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  placeholder?: string;
}

const Input = ({
  label,
  value,
  onChange,
  onBlur,
  disabled,
  error,
  helperText,
  placeholder,
}: InputProps) => {
  return (
    <div className="py-1">
      <label className="block text-sm font-medium mb-1">{label}</label>

      <div className="relative w-full">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={`px-3 py-2 w-full border rounded-lg focus:outline-none transition-all
            focus:border-primary focus:ring-1 focus:ring-primary text-text
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-background"}
            ${error ? "border-rose-400" : "border-gray-300"}
          `}
        />
      </div>

      <p
        className={`mt-1 text-sm flex items-center gap-1 min-h-[1.25rem] ${
          error ? "text-rose-500" : "text-secondary"
        }`}
      >
        {error ? (
          <>
            <CircleX size={14} className="shrink-0" />
            {error}
          </>
        ) : helperText ? (
          <>
            <Info size={14} className="shrink-0" />
            {helperText}
          </>
        ) : (
          "\u00A0"
        )}
      </p>
    </div>
  );
};

export default Input;
