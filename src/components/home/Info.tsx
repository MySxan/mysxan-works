// Info section - basic information about the developer
import { Section } from "../ui/Section";

export function Info() {
  return (
    <Section id="info" className="info-section">
      <div className="info-content">
        <div className="info-columns">
          <p>
            Tring to express my understanding of the world through my works — I
            create artworks and digital experiences that feel clear,
            intentional, and alive. I specialize in modern web development and
            user friendly design, with strong UI/UX instincts and a focus on
            interactive design. I care about clean code, performance, and the
            small details that make an interface effortless to use.
          </p>

          <p>
            My creative practice spans logo & font design, GFX & illustration,
            and music composition (DnB / Progressive House / Artcore). I'm drawn
            to illustration and composition, and I bring that visual sensibility
            into every system I design and ship.
          </p>
        </div>
      </div>
    </Section>
  );
}
