"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

interface HowItWorksProps {
  howItWorks: {
    step: string;
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
}

const HowItWorks = ({ howItWorks }: HowItWorksProps) => {
  return (
    <section className="bg-muted/20 py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 rounded-full px-4 py-2" variant="outline">
              🚀 Super Simple
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              How it <span className="bg-gradient-hero bg-clip-text text-transparent">works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seriously, it&apos;s easier than ordering pizza 🍕
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[70%] w-[60%] h-1 bg-linear-to-r from-primary/40 to-transparent rounded-full" />
                )}
                <Card className="p-6 text-center relative hover:shadow-lg transition-all rounded-3xl border-2 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mb-4 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xs font-black text-primary/60 mb-2 tracking-wider">
                    STEP {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

