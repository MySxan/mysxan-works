// Project data type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  year: number;
  featured: boolean;
}

// Mock projects data
export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment integration, and admin dashboard.",
    tags: ["React", "Node.js", "MongoDB", "TypeScript", "Stripe"],
    repoUrl: "https://github.com/username/ecommerce-platform",
    demoUrl: "https://demo-ecommerce.example.com",
    year: 2025,
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates using WebSocket. Built with React, Express, and PostgreSQL.",
    tags: ["React", "Express", "PostgreSQL", "WebSocket", "Redux"],
    repoUrl: "https://github.com/username/task-manager",
    demoUrl: "https://demo-tasks.example.com",
    year: 2025,
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A weather dashboard that displays current weather and forecasts using OpenWeather API. Responsive design with data visualization.",
    tags: ["React", "TypeScript", "Chart.js", "API Integration"],
    repoUrl: "https://github.com/username/weather-dashboard",
    demoUrl: "https://demo-weather.example.com",
    year: 2024,
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio Generator",
    description:
      "A tool to generate portfolio websites from markdown files. Built with Next.js and supports multiple themes.",
    tags: ["Next.js", "TypeScript", "Markdown", "Tailwind CSS"],
    repoUrl: "https://github.com/username/portfolio-generator",
    year: 2024,
    featured: false,
  },
  {
    id: 5,
    title: "Chat Application",
    description:
      "Real-time chat application with room support, built with Socket.io and React.",
    tags: ["React", "Socket.io", "Node.js", "Express"],
    repoUrl: "https://github.com/username/chat-app",
    demoUrl: "https://demo-chat.example.com",
    year: 2024,
    featured: true,
  },
  {
    id: 6,
    title: "Blog Platform",
    description:
      "A minimalist blog platform with markdown support and dark mode. Built with React and Firebase.",
    tags: ["React", "Firebase", "Markdown", "CSS"],
    repoUrl: "https://github.com/username/blog-platform",
    year: 2023,
    featured: false,
  },
];
