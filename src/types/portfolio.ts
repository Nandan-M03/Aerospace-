export interface Quote {
  id: string;
  text: string;
  author: string;
  affiliation?: string;
}

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  codename?: string;
  summary: string;
  details?: string;
  tags: string[];
  specs?: TechnicalSpec[];
  pdfName?: string;
  pdfDataId?: string; // key in IndexedDB for the file blob/data
  pdfSize?: string;
  date?: string;
  accentColor?: string;
}

export interface PortfolioSection {
  id: string;
  key: 'fighter-jets' | 'drones' | 'uavs' | 'others' | string;
  title: string;
  callsign: string; // e.g. "SEC-01 // AIR-SUPERIORITY"
  description: string;
  projects: Project[];
}

export interface StudentProfile {
  name: string;
  title: string;
  institution: string;
  department: string;
  location: string;
  status: string;
  aboutAerospace: string;
  specializations: string[];
  email?: string;
  linkedin?: string;
  github?: string;
}

export interface PortfolioData {
  version: number;
  profile: StudentProfile;
  quotes: Quote[];
  sections: PortfolioSection[];
}

