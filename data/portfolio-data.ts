import type { Project, Experience, Skill } from "../types/portfolio";

export const projects: Project[] = [
  {
    id: "1",
    title: "Funday",
    description:
      "An interactive Israeli platform offering live kids’ events, workshops, and educational shows—with booking, media previews, and user-friendly interface.",
    image: "/funday.png?height=300&width=500",
    technologies: ["Next.js", "React", "Tailwind CSS", "Node.js", "Strapi CMS"],
    githubUrl: null,
    liveUrl: "https://funday.co.il/",
    featured: true,
  },
  {
    id: "2",
    title: "Kidum LMS",
    description:
      "A modern Learning Management System (LMS) for K‑12 education, offering lesson planning, assessments, analytics, and curriculum integration.",
    image: "/kidum.png?height=300&width=500",
    technologies: ["React", "Material‑UI", "Redux"],
    githubUrl: null,
    liveUrl: "https://kidum.apptodate.dev/",
    featured: true,
  },
  {
    id: "3",
    title: "TLS Dashboard",
    description:
      "A comprehensive employee and textile management system enabling efficient handling of orders, employee roles, inventory, and reporting.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Material‑UI", "Redux"],
    githubUrl: null,
    liveUrl: "http://tls.apptodate.dev/",
    featured: false,
  },
  {
    id: "4",
    title: "Chipper",
    description:
      "A coupon-saving and deals marketplace platform in Israel where users can browse, save, and redeem deals across various categories for free.",
    image: "/chipper.png?height=300&width=500",
    technologies: ["Laravel", "MongoDB", "React", "Bootstrap"],
    githubUrl: null,
    liveUrl: "https://beta.chipper.co.il/he/",
    featured: true,
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Tuvoc Technology",
    position: "Full Stack Developer",
    duration: "2022 - Present",
    description: [
      "Developed scalable web applications using React, Next.js, and Node.js for multiple client projects.",
      "Integrated MongoDB and PostgreSQL databases for dynamic and high-performance backend systems.",
      "Built responsive and modern UIs using Tailwind CSS, Bootstrap, and Material UI (MUI).",
      "Led development of RESTful APIs using Express.js and Fastify.js for enterprise-grade solutions.",
      "Collaborated on Laravel-based projects and integrated complex backend logic with frontend components.",
      "Deployed applications on AWS and Google Cloud, utilizing Docker containers for isolated environments.",
      "Used Git for version control and participated in code reviews and agile sprint planning.",
      "Optimized CI/CD pipelines and implemented cloud-based security practices for deployments.",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Express.js",
      "Laravel",
      "Tailwind CSS",
      "Bootstrap",
      "MUI",
      "Docker",
      "AWS",
      "Google Cloud",
      "Git",
    ],
  },
];

export const skills: Skill[] = [
  { id: "1", name: "React", level: 95, category: "frontend" },
  { id: "2", name: "TypeScript", level: 90, category: "frontend" },
  { id: "3", name: "Next.js", level: 88, category: "frontend" },
  { id: "4", name: "Tailwind CSS", level: 92, category: "frontend" },
  { id: "5", name: "Angular", level: 75, category: "frontend" },
  { id: "6", name: "Vue.js", level: 80, category: "frontend" },
  { id: "7", name: "MUI", level: 95, category: "frontend" },
  { id: "8", name: "Node.js", level: 95, category: "backend" },
  { id: "9", name: "Express.js", level: 95, category: "backend" },
  { id: "10", name: "Fastify.js", level: 80, category: "backend" },
  { id: "11", name: "PostgreSQL", level: 75, category: "backend" },
  { id: "12", name: "MongoDB", level: 90, category: "backend" },
  { id: "13", name: "SQL", level: 75, category: "backend" },
  { id: "14", name: "Laravel", level: 75, category: "backend" },
  { id: "15", name: "Git", level: 90, category: "tools" },
  { id: "16", name: "Docker", level: 75, category: "tools" },
  { id: "17", name: "AWS", level: 80, category: "tools" },
  { id: "18", name: "Google Cloud", level: 75, category: "tools" },
  { id: "19", name: "Figma", level: 65, category: "other" },
];
