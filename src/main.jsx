import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RootRoute } from "./routes/root.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootRoute />
  </StrictMode>
);
