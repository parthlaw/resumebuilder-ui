export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ResumeItem {
  id: string;
  // For Experience
  title?: string;
  company?: string;
  location?: string;
  duration?: string;
  description?: string;
  // For Education
  degree?: string;
  institution?: string;
  year?: string;
  gpa?: string;
  // For Skills
  group?: string;
  skills?: string;
  // For Projects
  // title, description, duration already covered
}

export interface ResumeSection {
  id: string;
  type: "Experience" | "Education" | "Projects" | "Skills";
  items: ResumeItem[];
}

export interface SpacingConfig {
  lineHeight: number;
  sectionSpacing: number;
  itemSpacing: number;
  pageMargin: number;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  sections: ResumeSection[];
}

