
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image: string;
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
