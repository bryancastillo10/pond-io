import { BrowserRouter } from "react-router-dom";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default Provider;
