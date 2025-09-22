import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Provider from "@/app/Providers.tsx";
import App from "./app/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
