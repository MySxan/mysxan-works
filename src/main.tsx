import Lenis from "lenis";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Initialize Lenis smooth scrolling
const lenis = new Lenis({
  lerp: 0.12, // easing strength
  smoothWheel: true, // enable for global smooth scrolling
});

// Expose lenis globally for IntroStage
window.__lenis = lenis;

const raf = (time: number) => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
