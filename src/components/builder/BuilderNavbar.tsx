"use client";

import * as React from "react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Download, FileText, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import JDAnalyzer from "@/components/builder/JDAnalyzer";

const BuilderNavbar = () => {
  const [isJDDialogOpen, setIsJDDialogOpen] = useState(false);
  
  const handleDownload = () => {
    // TODO: Implement PDF download
    console.log('Download PDF');
  };

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-semibold">Resume Builder</h1>
      </div>
      <div className="flex items-center gap-4">
        <Dialog open={isJDDialogOpen} onOpenChange={setIsJDDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Sparkles className="w-4 h-4 mr-2" />
              Analyze JD
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Job Description Analyzer</DialogTitle>
            </DialogHeader>
            <JDAnalyzer />
          </DialogContent>
        </Dialog>
        <Button onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default BuilderNavbar;

