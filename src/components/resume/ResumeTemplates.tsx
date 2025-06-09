import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Eye, 
  Download, 
  Edit3, 
  ArrowRight, 
  CheckCircle, 
  Lightbulb,
  Move,
  ToggleLeft,
  Zap,
  Star
} from "lucide-react";
import { useState } from "react";

const templates = [
  {
    id: "minimal-professional",
    name: "Minimal Professional",
    description: "Left-aligned layout with clean sans-serif typography and subtle borders. Perfect for modern professionals seeking a clean, readable format.",
    category: "Professional",
    atsScore: 98,
    features: ["Left-Aligned Header", "Sans-Serif Font", "Minimal Colors"],
    preview: {
      header: { name: "John Doe", title: "Software Engineer", contact: "john@email.com | +1-234-567-8900" },
      sections: ["Summary", "Experience", "Education", "Skills"]
    }
  },
  {
    id: "modern-executive",
    name: "Modern Executive",
    description: "Center-aligned design with bold serif typography and strong borders. Ideal for senior executives and leadership positions.",
    category: "Executive", 
    atsScore: 96,
    features: ["Center-Aligned", "Serif Font", "Bold Borders"],
    preview: {
      header: { name: "Jane Smith", title: "Senior Director", contact: "jane@email.com | +1-234-567-8900" },
      sections: ["Profile", "Experience", "Leadership", "Education"]
    }
  },
  {
    id: "technical-clean",
    name: "Technical Clean",
    description: "Monospace font with compact layout and uppercase headings. Optimized for technical professionals and developers.",
    category: "Technical",
    atsScore: 97,
    features: ["Monospace Font", "Compact Layout", "Tech-Focused"],
    preview: {
      header: { name: "Alex Chen", title: "Full Stack Developer", contact: "alex@email.com | +1-234-567-8900" },
      sections: ["Skills", "Experience", "Projects", "Education"]
    }
  },
  {
    id: "academic-simple",
    name: "Academic Simple",
    description: "Traditional serif layout with center-aligned header and classic formatting. Perfect for academic and research positions.",
    category: "Academic",
    atsScore: 95,
    features: ["Traditional Layout", "Serif Typography", "Academic Style"],
    preview: {
      header: { name: "Dr. Sarah Wilson", title: "Research Scientist", contact: "sarah@email.com | +1-234-567-8900" },
      sections: ["Education", "Research", "Publications", "Experience"]
    }
  }
];

const guidedSteps = [
  { id: 1, title: "Choose Template", description: "Select a template that matches your industry", icon: FileText },
  { id: 2, title: "Add Information", description: "Fill in your details with guided prompts", icon: Edit3 },
  { id: 3, title: "Customize Layout", description: "Adjust sections and formatting", icon: Move },
  { id: 4, title: "Preview & Download", description: "Review and export your resume", icon: Download }
];

interface ResumeTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export const ResumeTemplates = ({ onSelectTemplate }: ResumeTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showGuidedTips, setShowGuidedTips] = useState(true);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onSelectTemplate(templateId);
  };

  const TemplatePreview = ({ template }: { template: typeof templates[0] }) => {
    const getPreviewStyle = () => {
      switch (template.id) {
        case "minimal-professional":
          return {
            container: "bg-white border border-gray-200 rounded-lg p-6 h-80 overflow-hidden shadow-sm",
            header: "border-b border-gray-300 pb-4 mb-4 text-left",
            name: "text-lg font-bold text-gray-900",
            title: "text-sm text-gray-600 font-medium",
            contact: "text-xs text-gray-500 mt-1",
            sectionTitle: "h-3 bg-gray-900 rounded w-24 mb-2",
            content: "space-y-1"
          };
        case "modern-executive":
          return {
            container: "bg-white border border-gray-200 rounded-lg p-6 h-80 overflow-hidden shadow-sm",
            header: "border-b-2 border-gray-900 pb-4 mb-4 text-center",
            name: "text-xl font-bold text-gray-900",
            title: "text-sm text-gray-600 font-medium",
            contact: "text-xs text-gray-500 mt-1",
            sectionTitle: "h-3 bg-gray-900 rounded w-32 mb-2 mx-auto",
            content: "space-y-1 text-center"
          };
        case "technical-clean":
          return {
            container: "bg-white border border-gray-200 rounded-lg p-6 h-80 overflow-hidden shadow-sm font-mono",
            header: "border-b-2 border-gray-900 pb-4 mb-4",
            name: "text-base font-bold text-gray-900 uppercase tracking-wide",
            title: "text-xs text-gray-600 font-mono",
            contact: "text-xs text-gray-500 mt-1 font-mono",
            sectionTitle: "h-2 bg-gray-900 rounded w-20 mb-2",
            content: "space-y-1"
          };
        case "academic-simple":
          return {
            container: "bg-white border border-gray-200 rounded-lg p-6 h-80 overflow-hidden shadow-sm font-serif",
            header: "border-b border-gray-400 pb-4 mb-4 text-center",
            name: "text-lg font-bold text-gray-900",
            title: "text-sm text-gray-600 italic",
            contact: "text-xs text-gray-500 mt-1",
            sectionTitle: "h-3 bg-gray-900 rounded w-28 mb-2",
            content: "space-y-1"
          };
        default:
          return {
            container: "bg-white border border-gray-200 rounded-lg p-6 h-80 overflow-hidden shadow-sm",
            header: "border-b border-gray-300 pb-4 mb-4 text-left",
            name: "text-lg font-bold text-gray-900",
            title: "text-sm text-gray-600 font-medium",
            contact: "text-xs text-gray-500 mt-1",
            sectionTitle: "h-3 bg-gray-900 rounded w-24 mb-2",
            content: "space-y-1"
          };
      }
    };

    const style = getPreviewStyle();

    return (
      <div className={style.container}>
        {/* Header */}
        <div className={style.header}>
          <h3 className={style.name}>{template.preview.header.name}</h3>
          <p className={style.title}>{template.preview.header.title}</p>
          <p className={style.contact}>{template.preview.header.contact}</p>
        </div>
        
        {/* Sections */}
        <div className="space-y-3">
          {template.preview.sections.map((section, index) => (
            <div key={index} className="space-y-1">
              <div className={style.sectionTitle}></div>
              <div className={style.content}>
                <div className="h-2 bg-gray-300 rounded w-full"></div>
                <div className="h-2 bg-gray-300 rounded w-4/5"></div>
                {index < 2 && <div className="h-2 bg-gray-300 rounded w-3/4"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Professional Resume Templates
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Choose from our carefully crafted templates designed for maximum impact and ATS compatibility. 
              Each template follows industry best practices and modern design principles.
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center items-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>ATS-Optimized</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-4 h-4 text-blue-600" />
                <span>HR-Approved</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Zap className="w-4 h-4 text-purple-600" />
                <span>Real-time Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Guided Steps */}
        {showGuidedTips && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-12">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">How it works</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowGuidedTips(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {guidedSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {step.id}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{step.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                    </div>
                    {index < guidedSteps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 mt-2 hidden md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Template Selection */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Choose Your Template</h2>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {previewMode ? 'Grid View' : 'Preview Mode'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                  selectedTemplate === template.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardHeader className="p-0">
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {template.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {template.description}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="text-green-600 border-green-200 bg-green-50 ml-4 flex-shrink-0"
                      >
                        {template.atsScore}% ATS
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                  <TemplatePreview template={template} />
                  
                  <div className="mt-6 flex gap-3">
                    <Button 
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateSelect(template.id);
                      }}
                    >
                      Use This Template
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Powerful Features for Professional Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Preview</h4>
              <p className="text-sm text-gray-600">
                See your changes instantly as you build your resume with live preview functionality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Move className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Drag & Drop</h4>
              <p className="text-sm text-gray-600">
                Easily rearrange sections and customize your resume layout with intuitive drag-and-drop.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <ToggleLeft className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Templates</h4>
              <p className="text-sm text-gray-600">
                Switch between templates seamlessly while preserving all your content and formatting.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gray-900 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Your Perfect Resume?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who have landed their dream jobs using our 
              expertly designed templates and powerful resume builder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => selectedTemplate && handleTemplateSelect(selectedTemplate)}
              >
                Start Building Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};