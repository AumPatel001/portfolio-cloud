import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import * as THREE from "three";

// Make THREE globally available for debugging
window.THREE = THREE;

createRoot(document.getElementById("root")!).render(<App />);
