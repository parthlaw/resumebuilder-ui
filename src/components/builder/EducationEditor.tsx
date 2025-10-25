"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ResumeItem } from "@/utils/store";

interface EducationEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ResumeItem) => void;
  initialData?: ResumeItem;
}

const EducationEditor = ({ isOpen, onClose, onSave, initialData }: EducationEditorProps) => {
  const [formData, setFormData] = useState<ResumeItem>({
    id: initialData?.id || "",
    degree: initialData?.degree || "",
    institution: initialData?.institution || "",
    location: initialData?.location || "",
    year: initialData?.year || "",
    gpa: initialData?.gpa || "",
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Education</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="degree">Degree *</Label>
            <Input
              id="degree"
              placeholder="Bachelor of Science in Computer Science"
              value={formData.degree}
              onChange={(e) => handleChange("degree", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution">Institution *</Label>
            <Input
              id="institution"
              placeholder="Stanford University"
              value={formData.institution}
              onChange={(e) => handleChange("institution", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Stanford, CA"
                value={formData.location || ""}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                placeholder="2018 - 2022"
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gpa">GPA (Optional)</Label>
            <Input
              id="gpa"
              placeholder="3.9/4.0"
              value={formData.gpa || ""}
              onChange={(e) => handleChange("gpa", e.target.value)}
            />
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

export default EducationEditor;

