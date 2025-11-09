"use client";

import { Button } from "@/components/ui/Button";
import { Edit2, Trash2 } from "lucide-react";
import { ResumeItem, ResumeSection as ResumeSectionType, useResumeStore } from "@/utils/store";
import { useState } from "react";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

interface EducationSectionProps {
    section: ResumeSectionType;
    onEdit: (itemId: string) => void;
}

const EducationSection = ({ section, onEdit }: EducationSectionProps) => {
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const updateSection = useResumeStore(state => state.updateSection);

    const handleDeleteItem = (itemId: string) => {
        const updatedItems = (section.items as ResumeItem[]).filter(i => i.id !== itemId);
        updateSection(section.id, { ...section, items: updatedItems });
        setItemToDelete(null);
    };

    return (
        <div className="space-y-4">
            {(section.items as ResumeItem[]).map((item, index) => (
                <div key={item.id || index} className="border-l-2 border-primary/20 pl-4 relative group">
                    <>
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold">{item.degree}</h4>
                            <div className="flex gap-1">
                                <span className="text-sm text-muted-foreground">{item.year}</span>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => onEdit(item.id)}
                                    className="transition-opacity h-7 w-7 p-0"
                                >
                                    <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setItemToDelete(item.id)}
                                    className="transition-opacity h-7 w-7 p-0"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.institution}</p>
                        {item.location && (
                            <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
                        )}
                        {item.gpa && <p className="text-sm mt-1">GPA: {item.gpa}</p>}
                    </>
                </div>
            ))}

            <ConfirmationDialog
                open={!!itemToDelete}
                onOpenChange={(open) => !open && setItemToDelete(null)}
                onConfirm={() => itemToDelete && handleDeleteItem(itemToDelete)}
                title="Delete Item"
                description="Are you sure you want to delete this item? This action cannot be undone."
                confirmText="Delete"
                variant="destructive"
            />
        </div>
    );
};

export default EducationSection;
