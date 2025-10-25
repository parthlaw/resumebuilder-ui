"use client";

import { FileText, Home, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/utils";

const BuilderSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: FileText, label: "My Resumes", path: "/builder" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))] flex flex-col">
      <div className="p-6 border-b border-[hsl(var(--sidebar-border))]">
        <h2 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          LatexResumeAI
        </h2>
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
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-primary))] font-medium"
                      : "text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]/50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
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

