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
        return "border border-transparent  bg-linear-to-t from-dark-primary to-accent text-white hover:bg-gradient-to-r";
      case "outline":
        return "border text-primary border-primary hover:border-primary  hover:bg-gradient-to-t from-primary to-accent hover:text-white";
      case "danger":
        return "border border-transparent text-white bg-linear-to-t from-rose-600 to-rose-400 hover:bg-gradient-to-r";
      default:
        return "bg-linear-to-l from-sky-500 to-gray-400 text-slate-100  hover:bg-gradient-to-t p-0";
    }
  };
  return (
    <button
      onClick={action}
      disabled={disabled}
      type={type}
      className={`${width} ${fontSize} shadow-lg font-semibold px-3 py-2 rounded-lg disabled:bg-neutral
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
