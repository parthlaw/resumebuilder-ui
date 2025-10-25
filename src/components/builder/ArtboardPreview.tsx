"use client";

import * as React from "react";
import { cn } from "@/utils";
import { ResumeData } from "@/types";
import { useResumeStore } from "@/utils/store";
import TechProfessionalV0 from "@/templates/techprofessional/v0";

interface ArtboardPreviewProps {
  resumeData: ResumeData;
  mode?: "builder" | "standalone";
  className?: string;
}

export function ArtboardPreview({
  resumeData,
  mode = "standalone",
  className,
}: ArtboardPreviewProps) {
  const { spacingConfig, pageSize } = useResumeStore();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  
  // Get page dimensions based on size
  const pageDimensions = pageSize === "letter" 
    ? { width: "8.5in", height: "11in" }
    : { width: "8.27in", height: "11.69in" };

  // Check for overflow
  React.useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const hasOverflow = contentRef.current.scrollHeight > contentRef.current.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();
    
    // Add resize observer to detect content changes
    const observer = new ResizeObserver(checkOverflow);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, [resumeData, spacingConfig, pageSize]);

  return (
    <div className={cn("relative mx-auto", className)}>
      {/* Page boundary indicator */}
      <div
        className="relative"
        style={{
          width: pageDimensions.width,
          height: pageDimensions.height,
        }}
      >
        {/* Corner markers to show page boundaries */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Top-left corner */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400" />
          {/* Top-right corner */}
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400" />
          {/* Bottom-left corner */}
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400" />
          {/* Bottom-right corner */}
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400" />
        </div>

        {/* Overflow warning */}
        {isOverflowing && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-1.5 animate-pulse">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Content exceeds page boundary
          </div>
        )}

        {/* Page size label */}
        <div className="absolute top-2 right-2 bg-slate-700 text-white text-xs px-2 py-1 rounded shadow-sm z-20 opacity-60 hover:opacity-100 transition-opacity">
          {pageSize === "letter" ? "Letter" : "A4"}
        </div>

        {/* The actual resume content */}
        <div
          ref={contentRef}
          className="bg-white shadow-xl overflow-hidden"
          style={{
            width: pageDimensions.width,
            height: pageDimensions.height,
          }}
        >
          <TechProfessionalV0 
            data={resumeData} 
            spacingConfig={spacingConfig}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
}

