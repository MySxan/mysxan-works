// Work data type definition
export interface Work {
  id: number;
  title: string;
  type: string;
  thumbnail: string;
  url: string;
  year: number;
}

// Mock works data
export const works: Work[] = [
  {
    id: 1,
    title: "Brand Identity Design",
    type: "Design",
    thumbnail: "/pic/IMG_2466.png",
    url: "https://example.com/",
    year: 2025,
  },
  {
    id: 2,
    title: "Mobile App UI/UX",
    type: "UI/UX Design",
    thumbnail: "pic/e51187edbcb5b00fb745ca91a17c64f0.png",
    url: "https://example.com/",
    year: 2025,
  },
  {
    id: 3,
    title: "Landing Page Development",
    type: "Development",
    thumbnail: "/pic/IMG_E2998.JPG",
    url: "https://example.com/",
    year: 2024,
  },
  {
    id: 4,
    title: "Dashboard Interface",
    type: "UI/UX Design",
    thumbnail: "/pic/OXVH2377.JPEG",
    url: "https://example.com/",
    year: 2024,
  },
  {
    id: 5,
    title: "E-Commerce Website",
    type: "Development",
    thumbnail: "/pic/RQSCE4138.JPG",
    url: "https://example.com/",
    year: 2024,
  },
  {
    id: 6,
    title: "Marketing Campaign",
    type: "Design",
    thumbnail: "pic/242388704_3_20220404044749894_wm.jpeg",
    url: "https://example.com/",
    year: 2023,
  },
];
