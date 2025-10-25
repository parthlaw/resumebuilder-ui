"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { Rocket } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Heart } from "lucide-react";
import RocketIllustration from "../illustrations/Rocket";
import AISparkle from "../illustrations/AISparkle";
import Document from "../illustrations/Document";
import CoffeeCup from "../illustrations/CoffeeCup";
import CheckmarkBadge from "../illustrations/CheckmarkBadge";
import FloatingStars from "../illustrations/FloatingStars";
import { ThemeToggle } from "../ui/ThemeToggle";
interface HeroProps {
  stats: {
    value: string;
    label: string;
  }[];
}
const Hero = ({ stats }: HeroProps) => {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Theme toggle in top right */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-success/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Badge
                className="px-4 py-2 text-sm font-medium rounded-full"
                variant="secondary"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                AI-Powered ✨
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Your Resume,
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                But Cooler 😎
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Stop stressing over formatting. Let AI do the heavy lifting while
              you focus on landing that dream job. Professional LaTeX resumes in
              minutes, not hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="text-lg px-8 py-6 group rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => router.push("/builder")}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Building
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-full"
                onClick={() => router.push("/builder?demo=true")}
              >
                Try the Demo
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>Loved by 10,000+ job seekers</span>
            </div>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Illustration - Resume Builder Scene */}
            <div className="relative">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-auto drop-shadow-2xl"
              >
                {/* Document/Paper */}
                <Document />
                
                {/* AI Sparkle Effect - Top Right */}
                <AISparkle />

                {/* Rocket */}
                <RocketIllustration />
                
                {/* Coffee Cup - Bottom Left */}
                <CoffeeCup />

                {/* Checkmark Badge - Bottom Right */}
                <CheckmarkBadge />

                {/* Floating Stars */}
                <FloatingStars />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Casual Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/20 transition-all"
              >
                <div className="text-3xl md:text-4xl font-black bg-gradient-hero bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
