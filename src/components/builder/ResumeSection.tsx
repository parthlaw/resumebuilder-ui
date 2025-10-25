"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Edit2, Trash2 } from "lucide-react";
import { ResumeSection as ResumeSectionType, ResumeItem } from "@/utils/store";
import { cn } from "@/utils";

interface ResumeSectionProps {
  section: ResumeSectionType;
  isHighlighted?: boolean;
  onEdit: (itemId: string) => void;
  onDelete: () => void;
}

const ResumeSection = ({ section, isHighlighted, onEdit, onDelete }: ResumeSectionProps) => {
  const renderContent = () => {
    if (section.type === "Skills") {
      return (
        <div className="space-y-3">
          {(section.items as ResumeItem[]).map((skillGroup, index) => (
            <div key={skillGroup.id || index} className="border-l-2 border-primary/20 pl-4">
              <h4 className="font-semibold text-sm mb-1">{skillGroup.group}</h4>
              <div className="flex flex-wrap gap-1.5">
                {skillGroup.skills?.split(',').map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {(section.items as ResumeItem[]).map((item, index) => (
          <div key={item.id || index} className="border-l-2 border-primary/20 pl-4 relative group">
            {section.type === "Experience" && (
              <>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <span className="text-sm text-muted-foreground">{item.duration}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                {item.location && (
                  <p className="text-xs text-muted-foreground mb-2">{item.location}</p>
                )}
                <div 
                  className="text-sm prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description || "" }}
                />
              </>
            )}
            {section.type === "Projects" && (
              <>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{item.title}</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                </div>
                {item.duration && (
                  <p className="text-xs text-muted-foreground mb-2">{item.duration}</p>
                )}
                <div 
                  className="text-sm prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description || "" }}
                />
              </>
            )}
            {section.type === "Education" && (
              <>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold">{item.degree}</h4>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <span className="text-sm text-muted-foreground">{item.year}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.institution}</p>
                {item.location && (
                  <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
                )}
                {item.gpa && <p className="text-sm mt-1">GPA: {item.gpa}</p>}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

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
      {renderContent()}
    </Card>
  );
};

export default ResumeSection;

