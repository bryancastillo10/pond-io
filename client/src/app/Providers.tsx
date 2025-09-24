import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import store from "@/lib/redux/store";

interface ProviderProps {
  children: React.ReactNode;
}

const persistor = persistStore(store);

const Provider = ({ children }: ProviderProps) => {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </ReduxProvider>
    </BrowserRouter>
  );
};

export default Provider;
