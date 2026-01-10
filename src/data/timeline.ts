// Timeline milestones data
export interface TimelineMilestone {
  id: number;
  year: number;
  title: string;
  description: string;
}

export type OrbitDomain = "frontend" | "design" | "music";

export interface OrbitMilestone {
  id: number;
  year: number;
  month: number;
  day: number;
  title: string;
  detail: string;
  domain: OrbitDomain;
  angle: number;
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

export const orbitTimeline: OrbitMilestone[] = [
  {
    id: 1,
    year: 2019,
    month: 1,
    day: 12,
    title: "Started Frontend",
    detail: "Built interfaces with HTML/CSS/JS and shipped first web pages.",
    domain: "frontend",
    angle: 200,
  },
  {
    id: 2,
    year: 2021,
    month: 4,
    day: 3,
    title: "UI Systems",
    detail: "Created modular UI patterns and consistent design tokens.",
    domain: "design",
    angle: 230,
  },
  {
    id: 3,
    year: 2022,
    month: 7,
    day: 22,
    title: "Modern Stack",
    detail: "React + TypeScript workflow with fast iteration and tooling.",
    domain: "frontend",
    angle: 260,
  },
  {
    id: 4,
    year: 2023,
    month: 9,
    day: 6,
    title: "Visual Studies",
    detail: "Expanded design practice across typography, brand, and layout.",
    domain: "design",
    angle: 295,
  },
  {
    id: 5,
    year: 2024,
    month: 10,
    day: 17,
    title: "Music Direction",
    detail: "Produced original tracks and integrated audio into projects.",
    domain: "music",
    angle: 320,
  },
  {
    id: 6,
    year: 2025,
    month: 11,
    day: 9,
    title: "Cross-Discipline",
    detail: "Merged code, design, and music into cohesive experiences.",
    domain: "music",
    angle: 340,
  },
];
