import { create } from "zustand";
import { PersonalInfo, ResumeSection, SpacingConfig, ResumeItem } from "@/types";

interface ResumeStore {
  // Personal Info
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;

  // Sections
  sections: ResumeSection[];
  setSections: (sections: ResumeSection[]) => void;
  addSection: (section: ResumeSection) => void;
  updateSection: (id: string, updates: Partial<ResumeSection>) => void;
  deleteSection: (id: string) => void;

  // Analysis
  isAnalyzing: boolean;
  setAnalyzing: (isAnalyzing: boolean) => void;
  analysisResults: string[];
  setAnalysisResults: (results: string[]) => void;

  // Template & Configuration
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  selectedTemplateVersion: string;
  setSelectedTemplateVersion: (version: string) => void;
  pageSize: "letter" | "a4";
  setPageSize: (size: "letter" | "a4") => void;
  spacingConfig: SpacingConfig;
  setSpacingConfig: (config: Partial<SpacingConfig>) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  // Personal Info
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  },
  setPersonalInfo: (info) => set({ personalInfo: info }),

  // Sections
  sections: [],
  setSections: (sections) => set({ sections }),
  addSection: (section) =>
    set((state) => ({ sections: [...state.sections, section] })),
  updateSection: (id, updates) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),
  deleteSection: (id) =>
    set((state) => ({ sections: state.sections.filter((s) => s.id !== id) })),

  // Analysis
  isAnalyzing: false,
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  analysisResults: [],
  setAnalysisResults: (results) => set({ analysisResults: results }),

  // Template & Configuration
  selectedTemplate: "modern",
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  selectedTemplateVersion: "v1",
  setSelectedTemplateVersion: (version) =>
    set({ selectedTemplateVersion: version }),
  pageSize: "letter",
  setPageSize: (size) => set({ pageSize: size }),
  spacingConfig: {
    lineHeight: 1.3,
    sectionSpacing: 0.5,
    itemSpacing: 0.8,
    pageMargin: 0.75,
  },
  setSpacingConfig: (config) =>
    set((state) => ({
      spacingConfig: { ...state.spacingConfig, ...config },
    })),
}));

// Export types for convenience
export type { ResumeItem, ResumeSection };

