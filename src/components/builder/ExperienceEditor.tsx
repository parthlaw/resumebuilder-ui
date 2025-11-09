"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { ResumeItem } from "@/utils/store";
import DurationSelector from "./DurationSelector";

interface ExperienceEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ResumeItem) => void;
  initialData?: ResumeItem;
}

const ExperienceEditor = ({ isOpen, onClose, onSave, initialData }: ExperienceEditorProps) => {
  const [formData, setFormData] = useState<ResumeItem>({
    id: initialData?.id || "",
    title: initialData?.title || "",
    company: initialData?.company || "",
    location: initialData?.location || "",
    duration: initialData?.duration || "",
    description: initialData?.description || "",
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
          <DialogTitle>Edit Experience</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="Senior Software Engineer"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                placeholder="Google"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="San Francisco, CA"
                value={formData.location || ""}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="location"
                placeholder="Jan 2023 - Mar 2025"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              content={formData.description || ""}
              onChange={(value) => handleChange("description", value)}
              placeholder="Describe your role, responsibilities, and achievements. Use formatting options above..."
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

export default ExperienceEditor;

