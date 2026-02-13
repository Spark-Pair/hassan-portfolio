export interface Project {
  id: string;
  title: string;
  caseStudyDetail?: string; // Project-specific line
  description: string;
  technologies: string[];
  deliverables?: string[];
  screenshots?: {
    id: string;
    title: string;
    url: string;
  }[];
  video?: string;
  image: string; // main thumbnail
  link?: string; // project page
}

export interface Experience {
  company: string;
  role: string;
  period: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
