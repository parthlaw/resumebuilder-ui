"use client";

import { useResumeStore } from "@/utils/store";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Settings2, RotateCcw } from "lucide-react";

export const SpacingControls = () => {
  const { spacingConfig, setSpacingConfig } = useResumeStore();

  const resetToDefaults = () => {
    setSpacingConfig({
      lineHeight: 1.3,
      sectionSpacing: 0.5,
      itemSpacing: 0.8,
      pageMargin: 0.75,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="w-4 h-4" />
          Spacing
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Spacing Controls</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetToDefaults}
              className="h-8 gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </Button>
          </div>

          {/* Line Height */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="line-height" className="text-sm">
                Line Height
              </Label>
              <span className="text-sm text-muted-foreground">
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
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="section-spacing" className="text-sm">
                Section Spacing
              </Label>
              <span className="text-sm text-muted-foreground">
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
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="item-spacing" className="text-sm">
                Item Spacing
              </Label>
              <span className="text-sm text-muted-foreground">
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
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="page-margin" className="text-sm">
                Page Margin
              </Label>
              <span className="text-sm text-muted-foreground">
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

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Adjust spacing to fit more content or improve readability.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

