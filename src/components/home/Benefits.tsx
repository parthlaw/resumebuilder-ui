"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

interface BenefitsProps {
  benefits: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
}

const Benefits = ({ benefits }: BenefitsProps) => {
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
            💪 The Good Stuff
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            What&apos;s in it for <span className="bg-gradient-hero bg-clip-text text-transparent">you?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Honestly? A lot. Here&apos;s what makes us different
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-6 h-full border-2 border-border hover:border-primary/30 transition-all rounded-2xl bg-linear-to-br from-card to-muted/5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-hero shadow-md">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Benefits;

