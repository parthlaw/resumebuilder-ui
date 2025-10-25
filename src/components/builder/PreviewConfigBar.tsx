"use client";

import { useState } from "react";
import { useResumeStore } from "@/utils/store";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { FileType, Settings2, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const PreviewConfigBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { 
    selectedTemplate, 
    setSelectedTemplate,
    selectedTemplateVersion,
    setSelectedTemplateVersion,
    pageSize, 
    setPageSize,
    spacingConfig,
    setSpacingConfig 
  } = useResumeStore();

  const resetSpacing = () => {
    setSpacingConfig({
      lineHeight: 1.3,
      sectionSpacing: 0.5,
      itemSpacing: 0.8,
      pageMargin: 0.75,
    });
  };

  return (
    <Card className="border-b rounded-none border-t-0 border-x-0 shrink-0">
      <div className="px-6 py-2">
        {/* Compact Main Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium flex items-center gap-1.5 whitespace-nowrap">
                <FileType className="w-3.5 h-3.5 text-muted-foreground" />
                Page
              </Label>
              <Select value={pageSize} onValueChange={(value: 'letter' | 'a4') => setPageSize(value)}>
                <SelectTrigger className="w-[100px] h-8">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="letter">Letter</SelectItem>
                  <SelectItem value="a4">A4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Spacing Quick Controls */}
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium flex items-center gap-1.5 whitespace-nowrap">
                <Settings2 className="w-3.5 h-3.5 text-muted-foreground" />
                Spacing
              </Label>
              <div className="flex gap-1">
                <Button
                  variant={spacingConfig.lineHeight === 1.15 && spacingConfig.sectionSpacing === 0.3 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSpacingConfig({
                    lineHeight: 1.15,
                    sectionSpacing: 0.3,
                    itemSpacing: 0.5,
                    pageMargin: 0.5,
                  })}
                  className="text-xs h-8 px-3"
                >
                  Compact
                </Button>
                <Button
                  variant={spacingConfig.lineHeight === 1.3 && spacingConfig.sectionSpacing === 0.5 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSpacingConfig({
                    lineHeight: 1.3,
                    sectionSpacing: 0.5,
                    itemSpacing: 0.8,
                    pageMargin: 0.75,
                  })}
                  className="text-xs h-8 px-3"
                >
                  Normal
                </Button>
                <Button
                  variant={spacingConfig.lineHeight === 1.6 && spacingConfig.sectionSpacing === 0.8 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSpacingConfig({
                    lineHeight: 1.6,
                    sectionSpacing: 0.8,
                    itemSpacing: 1.2,
                    pageMargin: 1.0,
                  })}
                  className="text-xs h-8 px-3"
                >
                  Relaxed
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetSpacing}
                className="h-8 px-2 gap-1"
                title="Reset to default spacing"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Expand/Collapse Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 px-2 gap-1 text-xs"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Less
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                More
              </>
            )}
          </Button>
        </div>

        {/* Fine-tune Spacing Controls - Collapsible */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Line Height */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="line-height" className="text-xs">
                    Line Height
                  </Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {spacingConfig.lineHeight.toFixed(2)}
                  </span>
                </div>
                <Slider
                  id="line-height"
                  min={1.0}
                  max={2.0}
                  step={0.05}
                  value={[spacingConfig.lineHeight]}
                  onValueChange={([value]) => setSpacingConfig({ lineHeight: value })}
                  className="w-full"
                />
              </div>

              {/* Section Spacing */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="section-spacing" className="text-xs">
                    Section Spacing
                  </Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {spacingConfig.sectionSpacing.toFixed(2)}em
                  </span>
                </div>
                <Slider
                  id="section-spacing"
                  min={0.2}
                  max={1.5}
                  step={0.1}
                  value={[spacingConfig.sectionSpacing]}
                  onValueChange={([value]) => setSpacingConfig({ sectionSpacing: value })}
                  className="w-full"
                />
              </div>

              {/* Item Spacing */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="item-spacing" className="text-xs">
                    Item Spacing
                  </Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {spacingConfig.itemSpacing.toFixed(2)}em
                  </span>
                </div>
                <Slider
                  id="item-spacing"
                  min={0.2}
                  max={1.5}
                  step={0.1}
                  value={[spacingConfig.itemSpacing]}
                  onValueChange={([value]) => setSpacingConfig({ itemSpacing: value })}
                  className="w-full"
                />
              </div>

              {/* Page Margin */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="page-margin" className="text-xs">
                    Page Margin
                  </Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {spacingConfig.pageMargin.toFixed(2)}in
                  </span>
                </div>
                <Slider
                  id="page-margin"
                  min={0.25}
                  max={1.5}
                  step={0.05}
                  value={[spacingConfig.pageMargin]}
                  onValueChange={([value]) => setSpacingConfig({ pageMargin: value })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

