"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { ResumeItem } from "@/utils/store";

interface ProjectEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ResumeItem) => void;
  initialData?: ResumeItem;
}

const ProjectEditor = ({ isOpen, onClose, onSave, initialData }: ProjectEditorProps) => {
  const [formData, setFormData] = useState<ResumeItem>({
    id: initialData?.id || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    duration: initialData?.duration || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof ResumeItem, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              placeholder="E-commerce Platform"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="Jan 2023 - Mar 2023"
              value={formData.duration || ""}
              onChange={(e) => handleChange("duration", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              content={formData.description || ""}
              onChange={(value) => handleChange("description", value)}
              placeholder="Describe the project, your role, technologies used, and key achievements..."
            />
            <p className="text-xs text-muted-foreground">
              Use the toolbar to format your text with bold, italic, bullet points, etc.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectEditor;

