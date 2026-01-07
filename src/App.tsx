// Main App component - single-page personal website with anchor sections
import { useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { IntroStage } from "./components/layout/IntroStage";
import { Info } from "./components/home/Info";
import { Projects } from "./components/home/Projects";
import { Works } from "./components/home/Works";
import { About } from "./components/home/About";
import { Contact } from "./components/home/Contact";
import { useTheme } from "./hooks/useTheme";
import "./styles/globals.css";
import "./styles/main.css";
import "./styles/intro.css";
import "./styles/info.css";

function App() {
  const [navVisible, setNavVisible] = useState(false);

  // Initialize theme
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Navbar className={navVisible ? "visible" : ""} />

      {/* Theme Toggle Button - fixed at bottom right */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {/* Fixed Background at the very bottom */}
      <div className="page-background">
        <img
          src={`${import.meta.env.BASE_URL}pic/~2ZDY(VVFDCT$QV59Q%]Y_3.png`}
          alt="Background"
        />
        <div className="background-overlay" />
      </div>

      <main>
        <IntroStage onScrollComplete={setNavVisible}>
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
