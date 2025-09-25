import { useAppSelector } from "@/lib/redux/hooks";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const darkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <section
      className={`${
        darkMode
          ? "bg-dark-background text-dark-text "
          : "bg-background text-text"
      } flex-1 flex flex-col w-full duration-500 ease-in-out p-4`}
    >
      {children}
    </section>
  );
};

export default ThemeProvider;
