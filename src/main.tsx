// Restore dark mode preference before render
if (localStorage.getItem('bb_dark_mode') === '1') {
  document.documentElement.classList.add('dark');
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
