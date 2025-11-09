"use client";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useResumeStore } from "@/utils/store";
import { toast } from "@/hooks/use-toast";

const JDAnalyzer = () => {
  const [jdText, setJdText] = useState("");
  const { isAnalyzing, setAnalyzing, setAnalysisResults } = useResumeStore();

  useEffect(() => {
    // Load mock JD data
    fetch("/data/jd.json")
      .then((res) => res.json())
      .then((data) => {
        setJdText(
          `${data.jobTitle} at ${data.company}\n\n${data.description}`
        );
      });
  }, []);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    
    // Simulate AI analysis with delay
    setTimeout(() => {
      // Mock analysis: highlight sections that match keywords
      const keywords = ["React", "TypeScript", "TailwindCSS", "APIs"];
      setAnalysisResults(keywords);
      setAnalyzing(false);
      
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed. Relevant sections are highlighted.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste the job description here..."
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
        className="min-h-[200px] mb-4"
      />
      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !jdText.trim()}
        className="w-full"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Analyze JD
          </>
        )}
      </Button>
      {useResumeStore.getState().analysisResults.length > 0 && (
        <div className="mt-4 p-4 bg-success/10 rounded-lg">
          <p className="text-sm text-success-foreground font-medium mb-2">
            Matching Keywords Found:
          </p>
          <div className="flex flex-wrap gap-2">
            {useResumeStore.getState().analysisResults.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-success text-success-foreground rounded text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JDAnalyzer;

