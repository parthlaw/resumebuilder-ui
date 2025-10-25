"use client";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Benefits from "@/components/home/Benefits";
import UseCases from "@/components/home/UseCases";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

import homeData from "@/data/home.json";

import {
  Sparkles,
  FileText,
  Zap,
  Target,
  CheckCircle2,
  Clock,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Code,
  Users,
  LucideIcon,
} from "lucide-react";

// Map icon names from JSON to actual Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  Sparkles,
  FileText,
  Zap,
  Target,
  CheckCircle2,
  Clock,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Code,
  Users,
};

export default function Home() {
  // Transform data to include icon components
  const features = homeData.features.map((feature) => ({
    ...feature,
    icon: iconMap[feature.icon],
  }));

  const howItWorks = homeData.howItWorks.map((item) => ({
    ...item,
    icon: iconMap[item.icon],
  }));

  const benefits = homeData.benefits.map((benefit) => ({
    ...benefit,
    icon: iconMap[benefit.icon],
  }));

  const useCases = homeData.useCases.map((useCase) => ({
    ...useCase,
    icon: iconMap[useCase.icon],
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero stats={homeData.stats} />
        <Features features={features} />
        <HowItWorks howItWorks={howItWorks} />
        <Benefits benefits={benefits} />
        <UseCases useCases={useCases} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
