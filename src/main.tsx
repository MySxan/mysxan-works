import Lenis from "lenis";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n";
import "./index.css";
import App from "./App.tsx";

interface LenisGlobal extends Window {
  __lenis?: Lenis;
  __lenis_stop: () => void;
  __lenis_start: () => void;
}

const initLenis = () => {
  const lenis = new Lenis({
    lerp: 0.12, // easing strength
    smoothWheel: true, // enable for global smooth scrolling
  });

  window.__lenis = lenis;

  const originalStop = lenis.stop.bind(lenis);
  const originalStart = lenis.start.bind(lenis);

  (window as unknown as LenisGlobal).__lenis_stop = () => {
    originalStop();
  };

  (window as unknown as LenisGlobal).__lenis_start = () => {
    originalStart();
  };

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
};

const initBootLoader = () => {
  const bootLoader = document.getElementById("boot-loader");
  if (!bootLoader) {
    document.documentElement.classList.remove("boot-loading");
    window.dispatchEvent(new Event("bootloader:done"));
    return;
  }
  let hasShown = false;
  try {
    hasShown = window.sessionStorage.getItem("boot-loader-shown") === "true";
  } catch {
    hasShown = false;
  }
  if (hasShown) {
    document.documentElement.classList.remove("boot-loading");
    bootLoader.remove();
    window.dispatchEvent(new Event("bootloader:done"));
    return;
  }
  try {
    window.sessionStorage.setItem("boot-loader-shown", "true");
  } catch {
    // Ignore storage failures and still show once.
  }
  const forceHide = window.setTimeout(() => {
    document.documentElement.classList.remove("boot-loading");
    bootLoader.remove();
    window.dispatchEvent(new Event("bootloader:done"));
  }, 3200);
  window.setTimeout(() => {
    bootLoader.classList.add("boot-loader--hide");
    window.setTimeout(() => {
      window.clearTimeout(forceHide);
      document.documentElement.classList.remove("boot-loading");
      bootLoader.remove();
      window.dispatchEvent(new Event("bootloader:done"));
    }, 400);
  }, 1200);
};

initLenis();

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initBootLoader, {
    once: true,
  });
} else {
  initBootLoader();
}
