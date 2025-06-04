
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Star, Sparkles } from "lucide-react";

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design perfect for tech roles",
    preview: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=300&h=400&fit=crop",
    atsScore: 95,
    popular: true,
    tags: ["Tech", "Corporate", "ATS-Optimized"]
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional layout ideal for corporate positions",
    preview: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop",
    atsScore: 90,
    popular: false,
    tags: ["Corporate", "Traditional", "ATS-Optimized"]
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Bold and artistic layout for creative professionals",
    preview: "https://images.unsplash.com/photo-1586953209441-e86736ea4d97?w=300&h=400&fit=crop",
    atsScore: 75,
    popular: false,
    tags: ["Creative", "Design", "Artistic"]
  },
  {
    id: "minimal",
    name: "Minimal Focus",
    description: "Simple and elegant design that highlights content",
    preview: "https://images.unsplash.com/photo-1586953218079-8c46c37ebe28?w=300&h=400&fit=crop",
    atsScore: 85,
    popular: false,
    tags: ["Minimal", "Clean", "ATS-Friendly"]
  },
  {
    id: "academic-clean",
    name: "Academic Clean",
    description: "Traditional academic format with clean typography and structure",
    preview: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=300&h=400&fit=crop",
    atsScore: 94,
    popular: true,
    tags: ["Academic", "Research", "ATS-Optimized"]
  },
  {
    id: "professional",
    name: "Professional Elite",
    description: "Premium layout for senior executives and leadership roles",
    preview: "https://images.unsplash.com/photo-1586953210448-a49b3f1b3b7b?w=300&h=400&fit=crop",
    atsScore: 98,
    popular: true,
    tags: ["Executive", "Leadership", "ATS-Optimized"]
  },
  {
    id: "technical",
    name: "Technical Specialist",
    description: "Optimized for technical roles with skills emphasis",
    preview: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop",
    atsScore: 92,
    popular: true,
    tags: ["Technical", "Engineering", "ATS-Optimized"]
  },
  {
    id: "academic",
    name: "Academic Professional",
    description: "Ideal for research, teaching and academic positions",
    preview: "https://images.unsplash.com/photo-1586953209441-e86736ea4d97?w=300&h=400&fit=crop",
    atsScore: 88,
    popular: false,
    tags: ["Academic", "Research", "ATS-Friendly"]
  },
  {
    id: "federal",
    name: "Federal Resume",
    description: "Specialized format for government and federal positions",
    preview: "https://images.unsplash.com/photo-1586953218079-8c46c37ebe28?w=300&h=400&fit=crop",
    atsScore: 96,
    popular: false,
    tags: ["Government", "Federal", "ATS-Optimized"]
  }
];

interface ResumeTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export const ResumeTemplates = ({ onSelectTemplate }: ResumeTemplatesProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Choose a Template</h2>
          <p className="text-gray-600">Select from our professionally designed, ATS-optimized templates</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <FileCheck className="w-4 h-4 text-green-600" />
            <span>ATS-Optimized</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 ml-4">
            <Star className="w-4 h-4 text-amber-500" />
            <span>Popular</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <CardHeader className="p-0 relative">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-48 object-cover"
              />
              {template.popular && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 hover:bg-amber-600 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Popular
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <Badge 
                  variant="outline" 
                  className={`flex items-center gap-1 ${template.atsScore >= 90 ? 'text-green-600 border-green-200' : 'text-amber-600 border-amber-200'}`}
                >
                  <FileCheck className="w-3 h-3" />
                  ATS: {template.atsScore}%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {template.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button 
                onClick={() => onSelectTemplate(template.id)}
                className="w-full"
              >
                Use This Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mt-8">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Premium Templates</h3>
            <p className="text-gray-700 mb-4">Our premium templates are designed by HR professionals and optimized for ATS systems with industry-specific keywords and formatting.</p>
            <Button variant="outline" className="bg-white">
              Explore Premium Features
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
