"use client";

import { Button } from "@/components/ui/Button";
import { ResumeItem, ResumeSection as ResumeSectionType, useResumeStore } from "@/utils/store";
import { useState, useRef } from "react";

interface SkillsSectionProps {
  section: ResumeSectionType;
}

const SkillsSection = ({ section }: SkillsSectionProps) => {
  const updateSection = useResumeStore(state => state.updateSection);
  const [addingGroupId, setAddingGroupId] = useState<string | null>(null);
  const [newSkillValue, setNewSkillValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const startAdding = (groupId: string) => {
    setAddingGroupId(groupId);
    setNewSkillValue("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const addSkillToGroup = (groupId: string, value: string) => {
    const skill = value.trim();
    if (!skill) return;
    const updatedItems = (section.items as ResumeItem[]).map(g => {
      if (g.id !== groupId) return g;
      const existing = g.skills ? g.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
      return { ...g, skills: [...existing, skill].join(",") };
    });
    updateSection(section.id, { ...section, items: updatedItems });
    setNewSkillValue("");
    setAddingGroupId(null);
  };

  const removeSkillFromGroup = (groupId: string, idxToRemove: number) => {
    const updatedItems = (section.items as ResumeItem[]).map(g => {
      if (g.id !== groupId) return g;
      const existing = g.skills ? g.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
      existing.splice(idxToRemove, 1);
      return { ...g, skills: existing.join(",") };
    });
    updateSection(section.id, { ...section, items: updatedItems });
  };

  return (
    <div className="space-y-3">
      {(section.items as ResumeItem[]).map((skillGroup, index) => (
        <div key={skillGroup.id || index} className="border-l-2 border-primary/20 pl-4">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm">{skillGroup.group}</h4>
            <Button size="sm" variant="ghost" onClick={() => startAdding(skillGroup.id)} className="h-7 w-7 p-0">
              <span className="text-lg">+</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5 items-center">
            {skillGroup.skills?.split(',').map((skill, idx) => (
              <div key={idx} className="inline-flex items-center group">
                <span className="relative inline-flex items-center px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                  <span className="pr-4">{skill.trim()}</span>
                  <button
                    aria-label={`Remove ${skill.trim()}`}
                    onClick={() => removeSkillFromGroup(skillGroup.id, idx)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity text-xs px-1"
                    title={`Remove ${skill.trim()}`}
                  >
                    ×
                  </button>
                </span>
              </div>
            ))}

            {addingGroupId === skillGroup.id && (
              <input
                ref={inputRef}
                value={newSkillValue}
                onChange={(e) => setNewSkillValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkillToGroup(skillGroup.id, newSkillValue);
                  } else if (e.key === "Escape") {
                    setAddingGroupId(null);
                    setNewSkillValue("");
                  }
                }}
                className="px-2 py-1 border rounded text-xs"
                placeholder="Add skill and press Enter"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
