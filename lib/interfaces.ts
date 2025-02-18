export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    technologies: string[];
    content: string;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demo?: string; // Optional demo URL
  link?: string; // Optional source code link
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[]; // Optional tags array
}