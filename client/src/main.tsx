import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initMotionEngine } from "./lib/motion";

initMotionEngine();

createRoot(document.getElementById("root")!).render(<App />);
