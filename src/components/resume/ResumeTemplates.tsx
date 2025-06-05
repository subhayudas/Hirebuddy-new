import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileCheck, Star, Zap, Users, GraduationCap, Building2, Code, Globe, CheckCircle } from "lucide-react";
import { useState } from "react";

const templates = [
  {
    id: "academic-modern",
    name: "Academic Modern",
    description: "Clean, research-focused design perfect for academic and research positions",
    preview: "/api/placeholder/300/400",
    atsScore: 98,
    popular: true,
    category: "Academic",
    features: ["Research-optimized", "Publication-friendly", "Clean typography"],
    tags: ["Academic", "Research", "Publications"]
  },
  {
    id: "professional-clean",
    name: "Professional Clean",
    description: "Minimalist design emphasizing clarity and professional presentation",
    preview: "/api/placeholder/300/400",
    atsScore: 96,
    popular: true,
    category: "Professional",
    features: ["ATS-optimized", "Corporate-friendly", "Minimal design"],
    tags: ["Corporate", "Executive", "ATS-Optimized"]
  },
  {
    id: "technical-modern",
    name: "Technical Modern",
    description: "Structured layout ideal for technical and engineering roles",
    preview: "/api/placeholder/300/400",
    atsScore: 94,
    popular: true,
    category: "Technical",
    features: ["Skills-focused", "Project-oriented", "Tech-optimized"],
    tags: ["Technical", "Engineering", "Skills"]
  },
  {
    id: "executive-elite",
    name: "Executive Elite",
    description: "Sophisticated design for senior leadership and executive positions",
    preview: "/api/placeholder/300/400",
    atsScore: 95,
    popular: false,
    category: "Executive",
    features: ["Leadership-focused", "Achievement-oriented", "Premium design"],
    tags: ["Executive", "Leadership", "Premium"]
  },
  {
    id: "creative-minimal",
    name: "Creative Minimal",
    description: "Balanced creativity with professional standards for design roles",
    preview: "/api/placeholder/300/400",
    atsScore: 88,
    popular: false,
    category: "Creative",
    features: ["Portfolio-ready", "Visual appeal", "Brand-friendly"],
    tags: ["Creative", "Design", "Portfolio"]
  },
  {
    id: "consulting-pro",
    name: "Consulting Pro",
    description: "Strategy-focused layout for consulting and business roles",
    preview: "/api/placeholder/300/400",
    atsScore: 93,
    popular: false,
    category: "Consulting",
    features: ["Strategy-oriented", "Case-study ready", "Business-focused"],
    tags: ["Consulting", "Strategy", "Business"]
  }
];

const categories = [
  { id: "all", name: "All Templates", icon: Globe },
  { id: "Academic", name: "Academic", icon: GraduationCap },
  { id: "Professional", name: "Professional", icon: Building2 },
  { id: "Technical", name: "Technical", icon: Code },
  { id: "Executive", name: "Executive", icon: Star },
  { id: "Creative", name: "Creative", icon: Zap },
  { id: "Consulting", name: "Consulting", icon: Users }
];

interface ResumeTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export const ResumeTemplates = ({ onSelectTemplate }: ResumeTemplatesProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const popularTemplates = templates.filter(template => template.popular);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Resume Templates
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose from expertly designed templates optimized for ATS systems and crafted by 
              HR professionals. Each template is tested for maximum readability and impact.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>ATS-Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <span>HR-Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Industry-Specific</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Popular Templates Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
            <Badge variant="secondary" className="ml-2">Recommended</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {popularTemplates.map((template) => (
              <Card 
                key={template.id} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-blue-200"
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                    <div className="absolute inset-4 bg-white rounded shadow-sm">
                      <div className="p-3 space-y-2">
                        <div className="h-3 bg-gray-900 rounded w-3/4"></div>
                        <div className="space-y-1">
                          <div className="h-1 bg-gray-400 rounded w-full"></div>
                          <div className="h-1 bg-gray-400 rounded w-5/6"></div>
                        </div>
                        <div className="pt-2 space-y-1">
                          <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                          <div className="space-y-0.5">
                            <div className="h-1 bg-gray-300 rounded w-full"></div>
                            <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                            <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs">
                      Popular
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="bg-white text-green-600 border-green-200 text-xs"
                    >
                      {template.atsScore}% ATS
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-5">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      onClick={() => onSelectTemplate(template.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Use This Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "hover:bg-blue-50 hover:border-blue-200"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* All Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <CardHeader className="p-0 relative overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-4 bg-white rounded shadow-sm">
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-gray-900 rounded w-3/4"></div>
                      <div className="space-y-1">
                        <div className="h-1 bg-gray-400 rounded w-full"></div>
                        <div className="h-1 bg-gray-400 rounded w-5/6"></div>
                      </div>
                      <div className="pt-2 space-y-1">
                        <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                        <div className="space-y-0.5">
                          <div className="h-1 bg-gray-300 rounded w-full"></div>
                          <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                          <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {template.popular && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs">
                      Popular
                    </Badge>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
                    {template.name}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className="text-green-600 border-green-200 text-xs ml-2 flex-shrink-0"
                  >
                    <FileCheck className="w-3 h-3 mr-1" />
                    {template.atsScore}%
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  onClick={() => onSelectTemplate(template.id)}
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our AI-powered template recommendation engine can analyze your experience 
              and suggest the perfect template for your career goals and target industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" className="bg-white hover:bg-gray-50">
                Get Template Recommendation
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                View Template Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};