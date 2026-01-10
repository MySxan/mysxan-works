// About section component - personal information, skills, and timeline
import { useTranslation } from "react-i18next";
import { Section } from "../ui/Section";
import { SkillGroup } from "../ui/SkillGroup";
import { Timeline } from "../ui/Timeline";
import { OrbitTimeline } from "../ui/OrbitTimeline";
import { skills } from "../../data/skills";
import { orbitTimeline, timeline } from "../../data/timeline";

export function About() {
  const { t } = useTranslation();
  const aboutParagraphs = t("about.paragraphs", { returnObjects: true });
  const paragraphList = Array.isArray(aboutParagraphs)
    ? aboutParagraphs
    : [String(aboutParagraphs)];

  return (
    <Section id="about" title={t("about.title")} className="about-section">
      {/* Split layout: Bio + Skills */}
      <div className="about-content">
        <div className="about-bio">
          {paragraphList.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 16)}`}>{paragraph}</p>
          ))}
        </div>

        <div className="about-skills">
          {skills.map((group) => (
            <SkillGroup key={group.category} group={group} />
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="about-timeline">
        <div className="timeline-orbit">
          <OrbitTimeline milestones={orbitTimeline} />
        </div>
        <div className="timeline-vertical">
          <Timeline milestones={timeline} />
        </div>
      </div>
    </Section>
  );
}
