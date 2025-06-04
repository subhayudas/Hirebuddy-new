
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X, Sparkles } from "lucide-react";
import { useState } from "react";

interface SkillsSectionProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export const SkillsSection = ({ skills, onChange }: SkillsSectionProps) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const addSuggestedSkills = () => {
    const suggested = ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Git", "SQL"];
    const newSkills = suggested.filter(skill => !skills.includes(skill));
    onChange([...skills, ...newSkills.slice(0, 5)]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🛠️ Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="newSkill">Add Skill</Label>
            <Input
              id="newSkill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., React, Python, Project Management"
            />
          </div>
          <Button onClick={addSkill} className="mt-6">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <Button onClick={addSuggestedSkills} variant="outline" size="sm" className="gap-2">
          <Sparkles className="w-4 h-4" />
          Add Popular Skills
        </Button>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        {skills.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No skills added yet. Add your key skills to make your resume stand out!
          </p>
        )}
      </CardContent>
    </Card>
  );
};
