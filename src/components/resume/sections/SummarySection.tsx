
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface SummarySectionProps {
  summary: string;
  onChange: (summary: string) => void;
}

export const SummarySection = ({ summary, onChange }: SummarySectionProps) => {
  const aiEnhance = () => {
    // Simulate AI enhancement with improved text
    const enhancedSummary = summary || "Experienced professional with a proven track record of delivering exceptional results. Skilled in problem-solving, team collaboration, and driving innovation. Passionate about leveraging technology to create meaningful impact and exceed organizational goals.";
    onChange(enhancedSummary);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📝 Professional Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            rows={4}
            value={summary}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
            className="resize-none"
          />
          <Button onClick={aiEnhance} variant="outline" size="sm" className="gap-2">
            <Sparkles className="w-4 h-4" />
            AI Enhance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
