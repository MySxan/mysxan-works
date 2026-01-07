// Projects section component - displays featured projects
import { Section } from "../ui/Section";
import { ProjectCard } from "../ui/ProjectCard";
import { projects } from "../../data/projects";

export function Projects() {
  // Filter featured projects and sort by year descending
  const featuredProjects = projects
    .filter((project) => project.featured === true)
    .sort((a, b) => b.year - a.year);

  return (
    <Section id="projects" title="Projects" className="projects-section">
      <div className="projects-grid">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
