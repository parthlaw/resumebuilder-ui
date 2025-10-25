"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

interface UseCasesProps {
  useCases: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
}

const UseCases = ({ useCases }: UseCasesProps) => {
  return (
    <section className="bg-muted/20 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 rounded-full px-4 py-2" variant="outline">
              👥 For Everyone
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Who is this <span className="bg-gradient-hero bg-clip-text text-transparent">for?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Spoiler alert: Probably you! 
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full text-center hover:shadow-xl transition-all rounded-3xl bg-card/80 backdrop-blur-sm border-2 hover:border-primary/30">
                  <div className="inline-flex p-4 rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 mb-4">
                    <useCase.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {useCase.description}
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

export default UseCases;

