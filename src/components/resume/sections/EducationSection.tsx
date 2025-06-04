
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface EducationSectionProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationSection = ({ education, onChange }: EducationSectionProps) => {
  const addEducation = () => {
    onChange([...education, { degree: "", school: "", year: "" }]);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎓 Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4 relative">
            <Button
              onClick={() => removeEducation(index)}
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Degree *</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div>
                <Label>School *</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                  placeholder="University of California, Berkeley"
                />
              </div>
            </div>
            
            <div>
              <Label>Year</Label>
              <Input
                value={edu.year}
                onChange={(e) => updateEducation(index, 'year', e.target.value)}
                placeholder="2018"
              />
            </div>
          </div>
        ))}
        
        <Button onClick={addEducation} variant="outline" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
};
