"use client";

import React, {useState, useEffect, useRef} from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isOverflowing, setIsOverflowing] = useState(false);
  
  // Get page dimensions in pixels (assuming 96 DPI)
  const pageDimensions = pageSize === "letter" 
    ? { width: 816, height: 1056 } // 8.5in * 96 = 816px, 11in * 96 = 1056px
    : { width: 794, height: 1123 }; // A4: 8.27in * 96 = 794px, 11.69in * 96 = 1123px

  // Calculate scale to fit page in container
  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current && mode === "builder") {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Calculate scale to fit both width and height, with some padding
        const padding = 40; // 20px padding on each side
        const availableWidth = containerWidth - padding;
        const availableHeight = containerHeight - padding;
        
        const scaleX = availableWidth / pageDimensions.width;
        const scaleY = availableHeight / pageDimensions.height;
        
        // Use the smaller scale to ensure it fits both dimensions
        const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    calculateScale();
    
    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [pageSize, mode, pageDimensions.width, pageDimensions.height]);

  // Check for overflow
  useEffect(() => {
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

  const scaledWidth = pageDimensions.width * scale;
  const scaledHeight = pageDimensions.height * scale;

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-full flex items-center justify-center overflow-hidden", className)}
    >
      {/* Page container with calculated scale */}
      <div
        className="relative"
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
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
          className="relative bg-white shadow-xl overflow-hidden"
          style={{
            width: `${pageDimensions.width}px`,
            height: `${pageDimensions.height}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <TechProfessionalV0 
            data={resumeData} 
            spacingConfig={spacingConfig}
            pageSize={pageSize}
          />
        </div>

        {/* Overflow warning */}
        {isOverflowing && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-40 flex items-center gap-1.5 animate-pulse">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Content exceeds page boundary
          </div>
        )}

        {/* Page size label */}
        <div className="absolute top-2 right-2 bg-slate-700 text-white text-xs px-2 py-1 rounded shadow-sm z-40 opacity-60 hover:opacity-100 transition-opacity">
          {pageSize === "letter" ? "Letter" : "A4"}
        </div>
      </div>
    </div>
  );
}

