export interface ProjectMetric {
  label: string;
  value: string;
  sublabel?: string;
}

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  description: string;
  metrics: ProjectMetric[];
  features: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: string;
}

export interface SkillItem {
  name: string;
  category: 'Programming' | 'AI & ML' | 'Backend' | 'Tools';
  level: number; // 0 - 100
  highlight: string;
  tag: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  description: string;
  skills: string[];
  badgeColor: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  organization: string;
  location: string;
  role: string;
  description: string;
  achievements: string[];
  technologies: string[];
}
