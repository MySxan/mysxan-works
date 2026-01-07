// Timeline milestones data
export interface TimelineMilestone {
  id: number;
  year: number;
  title: string;
  description: string;
}

export const timeline: TimelineMilestone[] = [
  {
    id: 1,
    year: 2020,
    title: "Started Web Development",
    description:
      "Began learning HTML, CSS, and JavaScript. Built first website.",
  },
  {
    id: 2,
    year: 2021,
    title: "React & Modern Stack",
    description:
      "Mastered React, TypeScript, and became proficient with modern tooling.",
  },
  {
    id: 3,
    year: 2022,
    title: "Full Stack Development",
    description:
      "Expanded skills to backend with Node.js, databases, and API design.",
  },
  {
    id: 4,
    year: 2023,
    title: "UI/UX Design Focus",
    description:
      "Integrated design skills with development to create complete user experiences.",
  },
  {
    id: 5,
    year: 2024,
    title: "Leading Projects",
    description:
      "Took on leadership roles in designing and building complex applications.",
  },
  {
    id: 6,
    year: 2025,
    title: "Creative Technologist",
    description:
      "Combining development, design, and creative vision for innovative solutions.",
  },
];
