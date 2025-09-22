interface ButtonProps {
  action?: () => void;
  type?: "submit" | "reset" | "button";
  width?: string;
  loading?: boolean;
  disabled?: boolean;
  fontSize?: string;
  variant?: string;
  children: React.ReactNode;
}

const Button = ({
  action,
  type = "button",
  width = "w-fit",
  fontSize = "text-base",
  loading,
  disabled,
  variant,
  children,
}: ButtonProps) => {
  const getBtnStyle = (variant: string) => {
    switch (variant) {
      case "primary":
        return "border shadow-xl border-transparent  bg-gradient-to-t from-dark-primary to-accent text-white hover:bg-gradient-to-r";
      case "outline":
        return "border text-primary border-primary hover:border-primary  hover:bg-primary hover:text-white";
      case "danger":
        return "border border-transparent text-white bg-rose-500 hover:bg-rose-700";
      default:
        return "bg-gradient-to-t from-cyan-600 to-slate-400 text-slate-100  hover:bg-gradient-to-r p-0";
    }
  };
  return (
    <button
      onClick={action}
      disabled={disabled}
      type={type}
      className={`${width} ${fontSize} font-semibold px-3 py-2 rounded-lg disabled:bg-neutral
        duration-500 ease-in-out
        ${getBtnStyle(variant!)}`}
    >
      {loading ? (
        <div className="flex justify-center items-center gap-0.5">
          <svg
            className="animate-spin size-4 mr-2 border-white border-t-outline border-t-darkGray border-2 rounded-full"
            viewBox="0 0 24 24"
          />
          <span className="font-semibold text-base">Loading . . .</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
