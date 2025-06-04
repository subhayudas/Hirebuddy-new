
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useRef } from "react";
import { Download, Eye, Save, RotateCcw, FileCheck, Share2, FileText } from "lucide-react";
import { ResumePreview } from "./ResumePreview";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { SummarySection } from "./sections/SummarySection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  const [atsScore, setAtsScore] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [showAtsView, setShowAtsView] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const modalResumeRef = useRef<HTMLDivElement>(null);
  
  // Format data for ResumePreview component
  const formattedData = {
    personalInfo: {
      name: resumeData.name,
      email: resumeData.email,
      phone: resumeData.phone,
      location: resumeData.location
    },
    summary: resumeData.summary,
    experience: resumeData.experience,
    education: resumeData.education,
    skills: resumeData.skills
  };

  // Function to generate and download PDF
  const generatePDF = async (fromModal = false) => {
    const targetRef = fromModal ? modalResumeRef.current : resumeRef.current;
    if (!targetRef) return;
    
    try {
      setIsGeneratingPdf(true);
      
      const canvas = await html2canvas(targetRef, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions to fit A4
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Generate filename based on user's name or default
      const fileName = resumeData.name ? 
        `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf` : 
        'Resume.pdf';
        
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

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
    updateAtsScore();
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
    updateAtsScore();
  };

  const updateExperience = (experience: any[]) => {
    setResumeData(prev => ({ ...prev, experience }));
    updateAtsScore();
  };

  const updateEducation = (education: any[]) => {
    setResumeData(prev => ({ ...prev, education }));
    updateAtsScore();
  };

  const updateSkills = (skills: string[]) => {
    setResumeData(prev => ({ ...prev, skills }));
    updateAtsScore();
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
    setAtsScore(0);
  };

  // New function to analyze resume against ATS
  const updateAtsScore = () => {
    // This would be replaced with actual ATS analysis logic
    // For now, we'll simulate a score based on resume completeness
    const completeness = progress;
    const keywordMatch = jobDescription ? calculateKeywordMatch() : 50;
    const formatScore = 85; // Simulated format score
    
    const newScore = Math.round((completeness * 0.4) + (keywordMatch * 0.4) + (formatScore * 0.2));
    setAtsScore(newScore > 100 ? 100 : newScore);
  };

  // Calculate keyword match between resume and job description
  const calculateKeywordMatch = () => {
    if (!jobDescription) return 50;
    
    const jdWords = jobDescription.toLowerCase().split(/\W+/);
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    
    let matches = 0;
    const uniqueWords = new Set(jdWords.filter(word => word.length > 3));
    
    uniqueWords.forEach(word => {
      if (resumeText.includes(word)) matches++;
    });
    
    return Math.min(100, Math.round((matches / Math.max(1, uniqueWords.size)) * 100));
  };

  // Get ATS score color
  const getScoreColor = () => {
    if (atsScore >= 80) return "text-green-600";
    if (atsScore >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Get ATS score message
  const getScoreMessage = () => {
    if (atsScore >= 80) return "Excellent! Your resume is well-optimized for ATS.";
    if (atsScore >= 60) return "Good, but there's room for improvement.";
    return "Needs improvement to pass ATS screening.";
  };

  // Get keyword suggestions based on job description
  const getKeywordSuggestions = () => {
    if (!jobDescription) return [];
    
    const jdWords = jobDescription.toLowerCase().split(/\W+/);
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    const uniqueWords = Array.from(new Set(jdWords.filter(word => 
      word.length > 4 && 
      !resumeText.includes(word) &&
      !['about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'because', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'during', 'except', 'inside', 'outside', 'through', 'toward', 'under', 'underneath', 'until', 'within', 'without'].includes(word)
    )));
    
    return uniqueWords.slice(0, 5);
  };

  // Update ATS score when resumeData changes
  useEffect(() => {
    updateAtsScore();
  }, [resumeData]);

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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`text-sm font-medium ${getScoreColor()} mr-4 flex items-center gap-1`}>
                      <FileCheck className="w-4 h-4" />
                      ATS Score: {atsScore}%
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getScoreMessage()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button variant="outline" size="sm" onClick={resetForm}>
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4" />
                {showPreview ? "Hide Preview" : "Preview"}
              </Button>
              <Button 
                variant={showAtsView ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAtsView(!showAtsView)}
                className="gap-1"
              >
                <FileCheck className="w-4 h-4" />
                ATS View
              </Button>
              <Button 
                size="sm"
                onClick={() => generatePDF(false)}
                disabled={isGeneratingPdf}
              >
                <Download className="w-4 h-4" />
                {isGeneratingPdf ? "Generating..." : "Download PDF"}
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
            {/* Job Description for ATS Optimization */}
            <Card className="bg-gradient-to-r from-indigo-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Job Description Analyzer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">Paste a job description to optimize your resume for ATS screening</p>
                  <textarea
                    className="w-full h-24 p-2 border rounded-md text-sm resize-none"
                    placeholder="Paste job description here to get keyword suggestions and ATS optimization tips..."
                    value={jobDescription}
                    onChange={(e) => {
                      setJobDescription(e.target.value);
                      updateAtsScore();
                    }}
                  ></textarea>
                  
                  {jobDescription && (
                    <div className="pt-2">
                      <p className="text-sm font-medium mb-2">Suggested Keywords:</p>
                      <div className="flex flex-wrap gap-2">
                        {getKeywordSuggestions().map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100">
                            {keyword}
                          </Badge>
                        ))}
                        {getKeywordSuggestions().length === 0 && (
                          <p className="text-sm text-gray-500">No additional keywords found</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

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
                    <p className="text-sm text-blue-800">📈 Your resume score: {atsScore}% - {getScoreMessage()}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Share2 className="w-4 h-4" />
                      Share for Feedback
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileCheck className="w-4 h-4" />
                      Full ATS Analysis
                    </Button>
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
              <div className="h-full bg-white rounded shadow-lg overflow-hidden" ref={resumeRef}>
                <ResumePreview data={formattedData} template={template} showAtsView={showAtsView} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-medium">Resume Preview</h3>
              <Button variant="ghost" size="sm" className="text-white" onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-gray-100">
              <div className="bg-white rounded shadow-lg mx-auto" style={{ maxWidth: '800px' }} ref={modalResumeRef}>
                <ResumePreview data={formattedData} template={template} showAtsView={showAtsView} />
              </div>
            </div>
            <div className="bg-gray-100 px-4 py-3 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Back to Editor
              </Button>
              <Button
                onClick={() => generatePDF(true)}
                disabled={isGeneratingPdf}
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPdf ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
