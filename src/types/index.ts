export interface SocialLink {
  name: string;
  icon: React.ComponentType;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  content: string;
} 