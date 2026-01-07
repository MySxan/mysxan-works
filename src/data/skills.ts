// Skills data with categories
export interface Skill {
  name: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
      { name: "Redux" },
      { name: "HTML/CSS" },
      { name: "JavaScript" },
    ],
  },
  {
    category: "Design",
    skills: [
      { name: "UI Design" },
      { name: "UX Research" },
      { name: "Figma" },
      { name: "Prototyping" },
      { name: "Design Systems" },
      { name: "Accessibility" },
    ],
  },
  {
    category: "Tools & Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Git" },
      { name: "REST APIs" },
      { name: "GraphQL" },
      { name: "Docker" },
    ],
  },
];
