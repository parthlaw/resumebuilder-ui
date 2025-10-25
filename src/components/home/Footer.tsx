import { Button } from "@/components/ui/Button";
import { Sparkles, Github, Mail, Rocket } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t-2 border-primary/10 bg-muted/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-black">
                LatexResumeAI
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Making resume building actually enjoyable. No more headaches, 
              just awesome results. Built with ❤️ for job seekers.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="mailto:contact@latexresumeai.com">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/builder"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <Rocket className="w-3 h-3" />
                  Resume Builder
                </a>
              </li>
              <li>
                <a
                  href="/builder?demo=true"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Demo
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/10 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 LatexResumeAI. Made with coffee ☕ and determination 💪
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

