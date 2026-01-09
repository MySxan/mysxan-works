// Main App component - single-page personal website with anchor sections
import { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { IntroStage } from "./components/layout/IntroStage";
import { Info } from "./components/home/Info";
import { Projects } from "./components/home/Projects";
import { Works } from "./components/home/Works";
import { About } from "./components/home/About";
import { Contact } from "./components/home/Contact";
import { useTheme } from "./hooks/useTheme";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import "./styles/globals.css";
import "./styles/main.css";
import "./styles/intro.css";
import "./styles/info.css";

function App() {
  const [navVisible, setNavVisible] = useState(false);

  // Initialize theme
  const { theme, toggleTheme } = useTheme();
  const [lang, setLang] = useState<"EN" | "ZH">("EN");
  const toggleLang = () => setLang((prev) => (prev === "EN" ? "ZH" : "EN"));
  const [footerInView, setFooterInView] = useState(false);

  // Observe footer visibility to hide toggles when footer is on screen
  useEffect(() => {
    const footerEl = document.querySelector<HTMLElement>("footer.footer");
    if (!footerEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setFooterInView(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );
    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar className={navVisible ? "visible" : ""} />

      {/* Toggle Rail - bottom right, unified style with separator */}
      <div
        className={`toggle-rail ${
          navVisible && !footerInView ? "visible" : ""
        }`}
        aria-label="Quick toggles"
      >
        <button
          className="toggle-btn theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <BsMoonFill /> : <BsSunFill />}
        </button>
        <span className="toggle-separator" aria-hidden="true" />
        <button
          className="toggle-btn lang-toggle"
          onClick={toggleLang}
          aria-label={`Switch language to ${lang === "EN" ? "ZH" : "EN"}`}
          title={`Switch language to ${lang === "EN" ? "ZH" : "EN"}`}
        >
          {lang}
        </button>
      </div>

      {/* Fixed Background at the very bottom */}
      <div className="page-background">
        <img
          src={`${import.meta.env.BASE_URL}img/background.png`}
          alt="Background"
        />
        <div className="background-overlay" />
      </div>

      <main>
        <IntroStage
          onScrollComplete={setNavVisible}
          lang={lang}
          toggleLang={toggleLang}
        >
          <Info />
          <Projects />
          <Works />
          <About />
          <Contact />
        </IntroStage>
      </main>
      <Footer />
    </>
  );
}

export default App;
