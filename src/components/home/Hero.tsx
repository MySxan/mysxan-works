// Hero section component - main landing section with introduction
import { Container } from "../ui/Container";

interface HeroProps {
  lang: "EN" | "ZH";
  toggleLang: () => void;
}

export function Hero(_props: HeroProps) {
  // Props passed for future i18n, currently unused
  const skills = [
    "Full Stack",
    "UI/UX",
    "Design",

    "GFX & ILLUST.",
    "Composition",
  ];

  return (
    <section id="hero" className="hero">
      <Container>
        <div className="hero-overlay-grid">
          <div className="hero-left">
            <img src="/logo 1.png" alt="Logo" className="hero-logo" />
            <p className="hero-tagline">
              FULL STACK DEVELOPER & CREATIVE CONTENT CREATOR
            </p>
            <p className="hero-intro">
              EXPRESS MY UNDERSTANDING OF THE WORLD THROUGH MY WORK
            </p>
          </div>

          <div className="hero-right">
            <ul className="hero-skill-list">
              {skills.map((skill, idx) => (
                <li
                  key={skill}
                  style={
                    { "--delay": `${0.3 + idx * 0.05}s` } as React.CSSProperties
                  }
                >
                  <span className="skill-label">{skill.toUpperCase()}</span>
                  {idx === 0 && (
                    <span className="skill-sub">REACT & TYPESCRIPT</span>
                  )}
                  {idx === 1 && (
                    <span className="skill-sub">Interactive Design</span>
                  )}
                  {idx === 2 && <span className="skill-sub">Logo & Font</span>}
                  {idx === 4 && (
                    <span className="skill-sub">
                      DnB & Prog. House & ARTCORE
                    </span>
                  )}
                  {idx === 3 && (
                    <span className="skill-sub">ALBUM & BANNER & POSTER</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="scroll-indicator">
          <span></span>
        </div>
      </Container>
    </section>
  );
}
