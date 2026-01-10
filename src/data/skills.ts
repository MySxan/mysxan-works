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
      { name: "JavaScript" },
      { name: "Vite" },
      { name: "Tailwind CSS" },
      { name: "HTML/CSS" },
      { name: "Responsive Design" },
      { name: "Component-based UI" },
    ],
  },
  {
    category: "UI/UX & Design",
    skills: [
      { name: "MasterGo" },
      { name: "Figma" },
      { name: "Adobe Illustrator" },
      { name: "Photoshop" },
      { name: "After Effects" },
      { name: "Fontlab" },
      { name: "Accessibility" },
    ],
  },
  {
    category: "Creative",
    skills: [
      { name: "GFX" },
      { name: "Illustrator" },
      { name: "Blender" },
      { name: "Procreate" },
      { name: "FL Studio" },
      { name: "Soundtrack" },
    ],
  },
];
