"use client";

import { ChevronLeft, ChevronRight, FileText, Home, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/utils";

const BuilderSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: FileText, label: "My Resumes", path: "/builder" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside 
      className={cn(
        "bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))] flex flex-col transition-all duration-300",
        isExpanded ? "w-[15%] min-w-[230px]" : "w-[8%] min-w-[100px]"
      )}
    >
      <div className="relative p-[17.5px] border-b border-[hsl(var(--sidebar-border))]">
        <h2 
          className={cn(
            "text-xl font-bold bg-gradient-hero bg-clip-text text-transparent transition-opacity duration-300",
            isExpanded ? "opacity-100" : "opacity-0"
          )}
        >
          LatexResumeAI
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-[hsl(var(--sidebar-accent))]/50 transition-colors"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => router.push(item.path)}
                  className={cn(
                    "w-full flex items-center transition-all duration-300 rounded-lg",
                    isExpanded ? "gap-3 px-4 py-3" : "justify-center p-3",
                    isActive
                      ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-primary))] font-medium"
                      : "text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]/50"
                  )}
                >
                  <item.icon className={cn(
                    "transition-transform duration-300",
                    isExpanded ? "w-5 h-5" : "w-6 h-6"
                  )} />
                  {isExpanded && (
                    <span>{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default BuilderSidebar;

