// SkillGroup component - displays a category of skills
import type { SkillCategory } from "../../data/skills";
import { Tag } from "./Tag";

interface SkillGroupProps {
  group: SkillCategory;
}

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div className="skill-group">
      <h3 className="skill-category">{group.category}</h3>
      <div className="skills-list">
        {group.skills.map((skill) => (
          <Tag key={skill.name} size="md">
            {skill.name}
          </Tag>
        ))}
      </div>
    </div>
  );
}
