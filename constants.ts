
import { Project, Experience, Skill } from './types';

export const PERSONAL_INFO = {
  name: "Muhammad Hassan",
  role: "Full Stack Engineer",
  email: "hassan@sparkpair.dev",
  experience: "08+",
  uptime_mentality: "99.9%",
  location: "Pakistan",
  bio: "Passionate Senior Full Stack Engineer with over 8 years of experience building scalable web applications and AI-driven solutions. Expert in React, Node.js, and Cloud Infrastructure.",
  detailedBio: "My journey in tech began with a curiosity about how the web works, which evolved into a career dedicated to building high-performance systems. I believe that great software isn't just about code—it's about solving real-world problems with elegance and efficiency.",
  mission: "To bridge the gap between complex engineering and intuitive user experiences, one pixel at a time.",
  linkedin: "https://linkedin.com/in/mr-itear",
  github: "https://github.com/hassan-ng",
  instagram: "https://instagram.com/mr_itear"
};

export const SKILLS: Skill[] = [
  { name: "MERN", icon: "fa-solid fa-layer-group" },
  { name: "Next js", icon: "fa-brands fa-react" },
  { name: "Type Script", icon: "fa-solid fa-code" },
  { name: "Tailwind", icon: "fa-solid fa-palette" },
  { name: "PHP", icon: "fa-brands fa-php" },
  { name: "Laravel", icon: "fa-brands fa-laravel" },
  { name: "MySql", icon: "fa-solid fa-database" },
  { name: "AWS", icon: "fa-brands fa-aws" }
];

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "AI Narrative Engine",
    description: "A generative AI platform that creates long-form narratives and marketing copy using Gemini Pro. Integrated with complex prompt engineering flows.",
    technologies: ["React", "Gemini API", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    link: "#"
  },
  {
    id: "02",
    title: "EcoTrack Dashboard",
    description: "Real-time environmental monitoring dashboard for smart cities. Visualizes air quality and traffic patterns.",
    technologies: ["TypeScript", "D3.js", "Redis"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
    link: "#"
  },
  {
    id: "03",
    title: "FinFlow SaaS",
    description: "Comprehensive financial management system for small businesses, featuring automated invoicing.",
    technologies: ["React", "AWS Lambda", "Stripe"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    link: "#"
  },
  {
    id: "04",
    title: "Nexus Cloud",
    description: "Automated cloud provisioning tool for managing multi-region AWS environments via Terraform.",
    technologies: ["Terraform", "Go", "AWS"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    link: "#"
  },
  {
    id: "05",
    title: "Aura Social",
    description: "Privacy-focused social network designed to improve digital well-being and community interaction.",
    technologies: ["Next.js", "Firebase", "Node.js"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
    link: "#"
  },
  {
    id: "06",
    title: "Lumina Vision",
    description: "Computer vision application for identifying manufacturing defects in real-time.",
    technologies: ["Python", "TensorFlow", "OpenCV"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    link: "#"
  },
  {
    id: "07",
    title: "Vortex Gaming",
    description: "Tournament management platform for esports communities with real-time updates.",
    technologies: ["Socket.io", "MongoDB", "React"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
    link: "#"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "SparkPair",
    role: "Founder & Full Stack Engineer",
    period: "2024 - Present",
  },
  {
    company: "The Creative Hub",
    role: "Full Stack Developer",
    period: "2023 - 2025",
  },
];
