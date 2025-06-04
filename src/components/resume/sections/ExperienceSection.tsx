
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Sparkles } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export const ExperienceSection = ({ experiences, onChange }: ExperienceSectionProps) => {
  const addExperience = () => {
    onChange([...experiences, { title: "", company: "", duration: "", description: "" }]);
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = experiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const enhanceDescription = (index: number) => {
    const enhanced = "• Led cross-functional team of 8 developers to deliver key projects 30% ahead of schedule\n• Implemented scalable solutions that increased system performance by 40%\n• Mentored junior developers and established best practices that reduced bugs by 25%";
    updateExperience(index, 'description', enhanced);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💼 Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4 relative">
            <Button
              onClick={() => removeExperience(index)}
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Job Title *</Label>
                <Input
                  value={exp.title}
                  onChange={(e) => updateExperience(index, 'title', e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div>
                <Label>Company *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  placeholder="TechCorp Inc."
                />
              </div>
            </div>
            
            <div>
              <Label>Duration *</Label>
              <Input
                value={exp.duration}
                onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                placeholder="Jan 2022 - Present"
              />
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                placeholder="• Describe your key achievements and responsibilities&#10;• Use bullet points for better readability&#10;• Include quantifiable results when possible"
                rows={4}
                className="resize-none"
              />
              <Button
                onClick={() => enhanceDescription(index)}
                variant="outline"
                size="sm"
                className="mt-2 gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Enhance
              </Button>
            </div>
          </div>
        ))}
        
        <Button onClick={addExperience} variant="outline" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </CardContent>
    </Card>
  );
};
