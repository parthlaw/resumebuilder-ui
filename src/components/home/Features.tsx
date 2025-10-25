"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

interface FeaturesProps {
  features: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
}
const Features = ({ features }: FeaturesProps) => {
  return (
    <section className="container mx-auto px-4 py-24">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-16">
        <Badge className="mb-4 rounded-full px-4 py-2" variant="outline">
          ✨ Cool Features
        </Badge>
        <h2 className="text-3xl md:text-5xl font-black mb-4">
          Why you&apos;ll <span className="bg-gradient-hero bg-clip-text text-transparent">love</span> it
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to create a resume that actually stands out 
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <Card className="p-8 h-full hover:shadow-card-hover transition-all duration-300 border-2 hover:border-primary/20 rounded-3xl bg-linear-to-br from-card to-muted/10">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-gradient-hero mb-6 shadow-lg">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
  );
};

export default Features;