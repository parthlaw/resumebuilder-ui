"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BuilderSidebar from "@/components/builder/BuilderSidebar";
import BuilderNavbar from "@/components/builder/BuilderNavbar";
import ResumeSection from "@/components/builder/ResumeSection";
import JDAnalyzer from "@/components/builder/JDAnalyzer";
import PersonalInfoSection from "@/components/builder/PersonalInfoSection";
import ExperienceEditor from "@/components/builder/ExperienceEditor";
import ProjectEditor from "@/components/builder/ProjectEditor";
import EducationEditor from "@/components/builder/EducationEditor";
import { PreviewConfigBar } from "@/components/builder/PreviewConfigBar";
import { ArtboardPreview } from "@/components/builder/ArtboardPreview";
import { useResumeStore } from "@/utils/store";
import { ResumeItem } from "@/types";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import {
  Edit,
  Eye,
  User,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Code,
  Plus,
} from "lucide-react";

export function BuilderContent() {
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get("demo") === "true";
  const [activeFormTab, setActiveFormTab] = useState<
    "personal" | "experience" | "projects" | "education" | "skills"
  >("personal");
  const [editingSection, setEditingSection] = useState<{
    sectionId: string;
    itemId: string;
  } | null>(null);
  const [addingNewItem, setAddingNewItem] = useState<{
    type: "Experience" | "Projects" | "Education";
  } | null>(null);

  const {
    sections,
    setSections,
    analysisResults,
    personalInfo,
    selectedTemplate,
    selectedTemplateVersion,
    pageSize,
    spacingConfig,
  } = useResumeStore();

  useEffect(() => {
    // Load mock resume data
    fetch("/data/resume.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.personalInfo) {
          useResumeStore.getState().setPersonalInfo(data.personalInfo);
        }
        if (data.sections) {
          setSections(data.sections);
        }
        if (isDemoMode) {
          toast({
            title: "Demo Resume Loaded",
            description: "This is a sample resume to get you started.",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to load resume data:", error);
      });
  }, [setSections, isDemoMode]);

  // No longer need this function - PDFDownloadLink handles it

  const handleEditSection = (sectionId: string, itemId: string) => {
    setEditingSection({ sectionId, itemId });
  };

  const handleSaveItem = (sectionId: string, item: ResumeItem) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section && Array.isArray(section.items)) {
      const updatedItems = section.items.map((i) =>
        i.id === item.id ? item : i
      ) as ResumeItem[];
      useResumeStore
        .getState()
        .updateSection(sectionId, { items: updatedItems });
      toast({
        title: "Updated",
        description: "Section item has been updated successfully.",
      });
    }
    setEditingSection(null);
  };

  const getEditingItem = (): ResumeItem | undefined => {
    if (!editingSection) return undefined;
    const section = sections.find((s) => s.id === editingSection.sectionId);
    if (section && Array.isArray(section.items)) {
      const items = section.items as ResumeItem[];
      return items.find((i) => i.id === editingSection.itemId);
    }
    return undefined;
  };

  const getEditingSection = () => {
    if (!editingSection) return null;
    return sections.find((s) => s.id === editingSection.sectionId);
  };

  const handleAddNewItem = (type: "Experience" | "Projects" | "Education") => {
    setAddingNewItem({ type });
  };

  const handleSaveNewItem = (
    type: "Experience" | "Projects" | "Education",
    item: ResumeItem
  ) => {
    // Find or create section of this type
    let section = sections.find((s) => s.type === type);

    if (!section) {
      // Create new section
      section = {
        id: `section-${type.toLowerCase()}-${Date.now()}`,
        type,
        items: [],
      };
      useResumeStore.getState().addSection(section);
    }

    // Add the new item with a unique ID
    const newItem = {
      ...item,
      id: `item-${Date.now()}`,
    };

    if (Array.isArray(section.items)) {
      const updatedItems = [...section.items, newItem] as ResumeItem[];
      useResumeStore
        .getState()
        .updateSection(section.id, { items: updatedItems });
      toast({
        title: "Added",
        description: `New ${type.toLowerCase()} item has been added successfully.`,
      });
    }
    setAddingNewItem(null);
  };

  const handleDeleteSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      useResumeStore.getState().deleteSection(sectionId);
      toast({
        title: "Section Deleted",
        description: `${section.type} section has been removed.`,
      });
    }
  };

  const isHighlighted = (section: { items: unknown }) => {
    if (analysisResults.length === 0) return false;
    const sectionText = JSON.stringify(section.items).toLowerCase();
    return analysisResults.some((keyword) =>
      sectionText.includes(keyword.toLowerCase())
    );
  };

  // Get selected template component
  // TODO: Add template rendering here

  return (
    <div className="flex h-screen bg-background">
      <BuilderSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <BuilderNavbar />

        <div className="flex-1 overflow-auto">
          <div className="flex flex-row h-full">
            <div className="container mx-auto p-6">
              <Tabs
                value={activeFormTab}
                onValueChange={(v) =>
                  setActiveFormTab(
                    v as
                      | "personal"
                      | "experience"
                      | "projects"
                      | "education"
                      | "skills"
                  )
                }
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="personal" className="gap-2">
                    <User className="w-4 h-4" />
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="gap-2">
                    <Briefcase className="w-4 h-4" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="gap-2">
                    <FolderGit2 className="w-4 h-4" />
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="education" className="gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="gap-2">
                    <Code className="w-4 h-4" />
                    Skills
                  </TabsTrigger>
                </TabsList>

                {/* Personal Info Tab */}
                <TabsContent value="personal" className="mt-0">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <PersonalInfoSection />
                    </div>
                    <div>
                      <JDAnalyzer />
                    </div>
                  </div>
                </TabsContent>

                {/* Experience Tab */}
                <TabsContent value="experience" className="mt-0">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      {sections
                        .filter((s) => s.type === "Experience")
                        .map((section) => (
                          <ResumeSection
                            key={section.id}
                            section={section}
                            isHighlighted={isHighlighted(section)}
                            onEdit={(itemId) =>
                              handleEditSection(section.id, itemId)
                            }
                            onDelete={() => handleDeleteSection(section.id)}
                          />
                        ))}
                      {sections.filter((s) => s.type === "Experience")
                        .length === 0 && (
                        <div className="text-center text-muted-foreground py-12">
                          No experience sections yet. Click &quot;Add
                          Experience&quot; below to get started.
                        </div>
                      )}
                      <Button
                        onClick={() => handleAddNewItem("Experience")}
                        className="w-full"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                    <div>
                      <JDAnalyzer />
                    </div>
                  </div>
                </TabsContent>

                {/* Projects Tab */}
                <TabsContent value="projects" className="mt-0">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      {sections
                        .filter((s) => s.type === "Projects")
                        .map((section) => (
                          <ResumeSection
                            key={section.id}
                            section={section}
                            isHighlighted={isHighlighted(section)}
                            onEdit={(itemId) =>
                              handleEditSection(section.id, itemId)
                            }
                            onDelete={() => handleDeleteSection(section.id)}
                          />
                        ))}
                      {sections.filter((s) => s.type === "Projects").length ===
                        0 && (
                        <div className="text-center text-muted-foreground py-12">
                          No project sections yet. Click &quot;Add Project&quot;
                          below to get started.
                        </div>
                      )}
                      <Button
                        onClick={() => handleAddNewItem("Projects")}
                        className="w-full"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                    <div>
                      <JDAnalyzer />
                    </div>
                  </div>
                </TabsContent>

                {/* Education Tab */}
                <TabsContent value="education" className="mt-0">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      {sections
                        .filter((s) => s.type === "Education")
                        .map((section) => (
                          <ResumeSection
                            key={section.id}
                            section={section}
                            isHighlighted={isHighlighted(section)}
                            onEdit={(itemId) =>
                              handleEditSection(section.id, itemId)
                            }
                            onDelete={() => handleDeleteSection(section.id)}
                          />
                        ))}
                      {sections.filter((s) => s.type === "Education").length ===
                        0 && (
                        <div className="text-center text-muted-foreground py-12">
                          No education sections yet. Click &quot;Add
                          Education&quot; below to get started.
                        </div>
                      )}
                      <Button
                        onClick={() => handleAddNewItem("Education")}
                        className="w-full"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                    <div>
                      <JDAnalyzer />
                    </div>
                  </div>
                </TabsContent>

                {/* Skills Tab */}
                <TabsContent value="skills" className="mt-0">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      {sections
                        .filter((s) => s.type === "Skills")
                        .map((section) => (
                          <ResumeSection
                            key={section.id}
                            section={section}
                            isHighlighted={isHighlighted(section)}
                            onEdit={(itemId) =>
                              handleEditSection(section.id, itemId)
                            }
                            onDelete={() => handleDeleteSection(section.id)}
                          />
                        ))}
                      {sections.filter((s) => s.type === "Skills").length ===
                        0 && (
                        <div className="text-center text-muted-foreground py-12">
                          No skills sections yet. Add one from the sidebar.
                        </div>
                      )}
                    </div>
                    <div>
                      <JDAnalyzer />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Editor Modals */}
              {editingSection && getEditingSection()?.type === "Experience" && (
                <ExperienceEditor
                  isOpen={true}
                  onClose={() => setEditingSection(null)}
                  onSave={(item) =>
                    handleSaveItem(editingSection.sectionId, item)
                  }
                  initialData={getEditingItem()}
                />
              )}

              {editingSection && getEditingSection()?.type === "Projects" && (
                <ProjectEditor
                  isOpen={true}
                  onClose={() => setEditingSection(null)}
                  onSave={(item) =>
                    handleSaveItem(editingSection.sectionId, item)
                  }
                  initialData={getEditingItem()}
                />
              )}

              {editingSection && getEditingSection()?.type === "Education" && (
                <EducationEditor
                  isOpen={true}
                  onClose={() => setEditingSection(null)}
                  onSave={(item) =>
                    handleSaveItem(editingSection.sectionId, item)
                  }
                  initialData={getEditingItem()}
                />
              )}

              {/* Add New Item Modals */}
              {addingNewItem?.type === "Experience" && (
                <ExperienceEditor
                  isOpen={true}
                  onClose={() => setAddingNewItem(null)}
                  onSave={(item) => handleSaveNewItem("Experience", item)}
                />
              )}

              {addingNewItem?.type === "Projects" && (
                <ProjectEditor
                  isOpen={true}
                  onClose={() => setAddingNewItem(null)}
                  onSave={(item) => handleSaveNewItem("Projects", item)}
                />
              )}

              {addingNewItem?.type === "Education" && (
                <EducationEditor
                  isOpen={true}
                  onClose={() => setAddingNewItem(null)}
                  onSave={(item) => handleSaveNewItem("Education", item)}
                />
              )}
            </div>
            <div className="flex flex-col h-full">
              <PreviewConfigBar />
              <div className="flex-1 overflow-hidden">
                <ArtboardPreview
                  resumeData={{
                    personalInfo,
                    sections,
                  }}
                  mode="builder"
                  className="w-full h-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
