// ProjectCard component - displays individual project information
import type { Project } from "../../data/projects";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { ButtonLink } from "./Button";
import { Tag } from "./Tag";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-year">{project.year}</span>
        </div>
      </CardHeader>

      <CardBody>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <Tag key={tag} size="sm">
              {tag}
            </Tag>
          ))}
        </div>
      </CardBody>

      {(project.repoUrl || project.demoUrl) && (
        <CardFooter>
          <div className="project-links">
            {project.repoUrl && (
              <ButtonLink href={project.repoUrl} variant="secondary">
                Repository
              </ButtonLink>
            )}
            {project.demoUrl && (
              <ButtonLink href={project.demoUrl} variant="primary">
                Live Demo
              </ButtonLink>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
