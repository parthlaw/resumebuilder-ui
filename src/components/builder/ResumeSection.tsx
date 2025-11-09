"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Edit2, Trash2 } from "lucide-react";
import { ResumeSection as ResumeSectionType } from "@/utils/store";
import { cn } from "@/utils";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import EducationSection from "./EducationSection";


interface ResumeSectionProps {
  section: ResumeSectionType;
  isHighlighted?: boolean;
  onEdit: (itemId: string) => void;
  onDelete: () => void;
}

const ResumeSection = ({ section, isHighlighted, onEdit, onDelete }: ResumeSectionProps) => {
  

  return (
    <Card
      className={cn(
        "p-6 transition-all duration-300",
        isHighlighted && "ring-2 ring-success shadow-lg"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold">{section.type}</h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={onDelete}
          className="hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      {section.type === "Skills" && <SkillsSection section={section} />}
      {section.type === "Experience" && <ExperienceSection section={section} onEdit={onEdit} />}
      {section.type === "Projects" && <ProjectsSection section={section} onEdit={onEdit} />}
      {section.type === "Education" && <EducationSection section={section} onEdit={onEdit} />}
    </Card>
  );
};

export default ResumeSection;

