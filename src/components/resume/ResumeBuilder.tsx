
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Download, Eye, Save, RotateCcw } from "lucide-react";
import { ResumePreview } from "./ResumePreview";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { SummarySection } from "./sections/SummarySection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";

interface ResumeBuilderProps {
  template: string;
  onBack: () => void;
}

export const ResumeBuilder = ({ template, onBack }: ResumeBuilderProps) => {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: [],
    education: [],
    skills: []
  });

  const [activeTab, setActiveTab] = useState("personal");

  // Calculate completion percentage
  const calculateProgress = () => {
    let completed = 0;
    const total = 6;
    
    if (resumeData.name && resumeData.email) completed++;
    if (resumeData.summary) completed++;
    if (resumeData.experience.length > 0) completed++;
    if (resumeData.education.length > 0) completed++;
    if (resumeData.skills.length > 0) completed++;
    if (resumeData.phone && resumeData.location) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const progress = calculateProgress();

  const updatePersonalInfo = (personalInfo: any) => {
    setResumeData(prev => ({ ...prev, ...personalInfo }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const updateExperience = (experience: any[]) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: any[]) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const resetForm = () => {
    setResumeData({
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      experience: [],
      education: [],
      skills: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack}>
                ← Back to Templates
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Resume Builder</h1>
                <p className="text-sm text-gray-600">Template: {template}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600 mr-4">
                Progress: {progress}%
              </div>
              <Progress value={progress} className="w-32" />
              <Button variant="outline" size="sm" onClick={resetForm}>
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
          {/* Editor Panel */}
          <div className="space-y-6 overflow-y-auto pr-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resume Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-6">
                    <TabsContent value="personal" className="space-y-4">
                      <PersonalInfoSection
                        data={{
                          name: resumeData.name,
                          email: resumeData.email,
                          phone: resumeData.phone,
                          location: resumeData.location
                        }}
                        onChange={updatePersonalInfo}
                      />
                    </TabsContent>
                    
                    <TabsContent value="summary" className="space-y-4">
                      <SummarySection
                        summary={resumeData.summary}
                        onChange={updateSummary}
                      />
                    </TabsContent>
                    
                    <TabsContent value="experience" className="space-y-4">
                      <ExperienceSection
                        experiences={resumeData.experience}
                        onChange={updateExperience}
                      />
                    </TabsContent>
                    
                    <TabsContent value="education" className="space-y-4">
                      <EducationSection
                        education={resumeData.education}
                        onChange={updateEducation}
                      />
                    </TabsContent>
                    
                    <TabsContent value="skills" className="space-y-4">
                      <SkillsSection
                        skills={resumeData.skills}
                        onChange={updateSkills}
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* AI Suggestions Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  🤖 AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border">
                    <p className="text-sm text-blue-800">💡 Add quantifiable achievements to your experience section</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border">
                    <p className="text-sm text-blue-800">🎯 Include relevant keywords for ATS optimization</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border">
                    <p className="text-sm text-blue-800">📈 Your resume score: 87% - Great job!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview Panel */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
              <h3 className="font-medium">Live Preview</h3>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Live</span>
              </div>
            </div>
            <div className="h-[calc(100%-48px)] bg-gray-100 p-4">
              <div className="h-full bg-white rounded shadow-lg overflow-hidden">
                <ResumePreview data={resumeData} template={template} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
