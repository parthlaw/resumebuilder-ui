"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Rocket, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Celebration from "@/components/illustrations/Celebration";

const CTA = () => {
  const router = useRouter();

  return (
    <section className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="relative overflow-hidden rounded-[3rem] border-4 border-primary/20 bg-linear-to-br from-primary/5 via-accent/5 to-primary/10">
          <div className="grid lg:grid-cols-2 gap-12 items-center p-8 md:p-12 lg:p-16">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent-foreground font-bold text-sm mb-6">
                🎉 Let&apos;s do this!
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Ready to crush that
                <br />
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  job application?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Join thousands of happy job seekers who landed their dream roles. 
                Your future self will thank you! 🙌
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 group rounded-full shadow-xl hover:shadow-2xl transition-all"
                  onClick={() => router.push("/builder")}
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Let&apos;s Go!
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-full"
                  onClick={() => router.push("/builder?demo=true")}
                >
                  Show Me First
                </Button>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="order-1 lg:order-2">
              <svg viewBox="0 0 400 400" className="w-full h-auto">
                <Celebration />
              </svg>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default CTA;

