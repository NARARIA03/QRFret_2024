import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "@router/Router";
import "./index.css";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <Router />
    </CookiesProvider>
  </StrictMode>
);
