
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design perfect for tech roles",
    preview: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=300&h=400&fit=crop"
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional layout ideal for corporate positions",
    preview: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop"
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Bold and artistic layout for creative professionals",
    preview: "https://images.unsplash.com/photo-1586953209441-e86736ea4d97?w=300&h=400&fit=crop"
  },
  {
    id: "minimal",
    name: "Minimal Focus",
    description: "Simple and elegant design that highlights content",
    preview: "https://images.unsplash.com/photo-1586953218079-8c46c37ebe28?w=300&h=400&fit=crop"
  }
];

interface ResumeTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export const ResumeTemplates = ({ onSelectTemplate }: ResumeTemplatesProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
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
    </div>
  );
};
