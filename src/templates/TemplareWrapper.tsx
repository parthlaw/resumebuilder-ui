import { useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";

interface TemplateWrapperProps {
  children: React.ReactNode;
  styles: string;
}

export default function TemplateWrapper({ 
  children, 
  styles 
}: TemplateWrapperProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<ShadowRoot | null>(null);
  const rootRef = useRef<Root | null>(null);
  
  // Create shadow root once
  useEffect(() => {
    if (!hostRef.current || shadowRef.current) return;
    
    const shadow = hostRef.current.attachShadow({ mode: "open" });
    shadowRef.current = shadow;
    
    // Create React root inside shadow
    const container = document.createElement("div");
    shadow.appendChild(container);
    rootRef.current = createRoot(container);
    
    // return () => {
    //   rootRef.current?.unmount();
    // };
  }, []);
  
  // Update content and styles
  useEffect(() => {
    if (!shadowRef.current || !rootRef.current) return;
    
    rootRef.current.render(
      <>
        <style>{styles}</style>
        {children}
      </>
    );
  }, [children, styles]);
  
  return <div ref={hostRef} />;
}