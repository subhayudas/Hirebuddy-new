import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { 
  ArrowLeft, 
  Download, 
  Save, 
  Eye, 
  Zap, 
  Target, 
  CheckCircle2, 
  Circle, 
  Sparkles,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Globe,
  Languages,
  Heart,
  Plus,
  Minus,
  RotateCcw,
  Share2,
  Settings,
  Palette,
  Layout,
  Type,
  Maximize2,
  Minimize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Enhanced form sections
import { EnhancedPersonalInfoSection } from "./enhanced-sections/EnhancedPersonalInfoSection";
import { EnhancedSummarySection } from "./enhanced-sections/EnhancedSummarySection";
import { EnhancedExperienceSection } from "./enhanced-sections/EnhancedExperienceSection";
import { EnhancedEducationSection } from "./enhanced-sections/EnhancedEducationSection";
import { EnhancedSkillsSection } from "./enhanced-sections/EnhancedSkillsSection";
import { EnhancedProjectsSection } from "./enhanced-sections/EnhancedProjectsSection";
import { EnhancedCertificationsSection } from "./enhanced-sections/EnhancedCertificationsSection";
import { EnhancedLanguagesSection } from "./enhanced-sections/EnhancedLanguagesSection";
import { EnhancedVolunteerSection } from "./enhanced-sections/EnhancedVolunteerSection";

// Enhanced preview component
import { EnhancedResumePreview } from "./EnhancedResumePreview";

// Types
interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
    honors: string;
    coursework: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
    frameworks: string[];
  };
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link: string;
    github: string;
    startDate: string;
    endDate: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate: string;
    credentialId: string;
    link: string;
  }>;
  languages: Array<{
    id: string;
    language: string;
    proficiency: string;
  }>;
  volunteer: Array<{
    id: string;
    organization: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
}

interface Settings {
  template: string;
  fontSize: number;
  fontFamily: string;
  colorScheme: string;
  spacing: string;
  showPhoto: boolean;
  sectionOrder: string[];
  enabledSections: Record<string, boolean>;
}

interface EnhancedResumeBuilderProps {
  template: string;
  onBack: () => void;
}

const SECTION_CONFIGS = [
  { id: 'personal', label: 'Personal Info', icon: User, color: 'blue' },
  { id: 'summary', label: 'Summary', icon: FileText, color: 'green' },
  { id: 'experience', label: 'Experience', icon: Briefcase, color: 'purple' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'amber' },
  { id: 'skills', label: 'Skills', icon: Code, color: 'cyan' },
  { id: 'projects', label: 'Projects', icon: Globe, color: 'pink' },
  { id: 'certifications', label: 'Certifications', icon: Award, color: 'orange' },
  { id: 'languages', label: 'Languages', icon: Languages, color: 'indigo' },
  { id: 'volunteer', label: 'Volunteer', icon: Heart, color: 'red' },
];

export const EnhancedResumeBuilder: React.FC<EnhancedResumeBuilderProps> = ({ 
  template, 
  onBack 
}) => {
  // State management
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
      frameworks: [],
    },
    projects: [],
    certifications: [],
    languages: [],
    volunteer: [],
  });

  const [settings, setSettings] = useState<Settings>({
    template,
    fontSize: 11,
    fontFamily: 'Inter',
    colorScheme: 'blue',
    spacing: 'normal',
    showPhoto: false,
    sectionOrder: ['personal', 'summary', 'experience', 'education', 'skills', 'projects'],
    enabledSections: {
      personal: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: false,
      certifications: false,
      languages: false,
      volunteer: false,
    },
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [atsScore, setAtsScore] = useState(0);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.8);

  // Refs
  const previewRef = useRef<HTMLDivElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  // Calculate completion and ATS score
  const calculateProgress = useCallback(() => {
    const sections = SECTION_CONFIGS.filter(section => 
      settings.enabledSections[section.id]
    );
    
    const completedSections = sections.filter(section => {
      switch (section.id) {
        case 'personal':
          return resumeData.personalInfo.name && resumeData.personalInfo.email;
        case 'summary':
          return resumeData.summary.length > 50;
        case 'experience':
          return resumeData.experience.length > 0;
        case 'education':
          return resumeData.education.length > 0;
        case 'skills':
          return Object.values(resumeData.skills).some(arr => arr.length > 0);
        case 'projects':
          return resumeData.projects.length > 0;
        case 'certifications':
          return resumeData.certifications.length > 0;
        case 'languages':
          return resumeData.languages.length > 0;
        case 'volunteer':
          return resumeData.volunteer.length > 0;
        default:
          return false;
      }
    });

    const percentage = sections.length > 0 ? 
      Math.round((completedSections.length / sections.length) * 100) : 0;

    return { percentage, completedSections: completedSections.length, totalSections: sections.length };
  }, [resumeData, settings.enabledSections]);

  const calculateAtsScore = useCallback(() => {
    let score = 0;
    
    // Personal info (20 points)
    if (resumeData.personalInfo.name && resumeData.personalInfo.email && resumeData.personalInfo.phone) {
      score += 20;
    }
    
    // Summary (20 points)
    if (resumeData.summary && resumeData.summary.length > 100) {
      score += 20;
    } else if (resumeData.summary && resumeData.summary.length > 50) {
      score += 10;
    }
    
    // Experience (30 points)
    if (resumeData.experience.length > 0) {
      score += 15;
      const hasDetailedDescriptions = resumeData.experience.some(exp => 
        exp.description && exp.description.length > 100
      );
      if (hasDetailedDescriptions) score += 15;
    }
    
    // Education (15 points)
    if (resumeData.education.length > 0) score += 15;
    
    // Skills (15 points)
    const totalSkills = Object.values(resumeData.skills).flat().length;
    if (totalSkills >= 8) {
      score += 15;
    } else if (totalSkills >= 5) {
      score += 10;
    } else if (totalSkills >= 3) {
      score += 5;
    }
    
    return Math.min(score, 100);
  }, [resumeData]);

  // Effects
  useEffect(() => {
    setAtsScore(calculateAtsScore());
  }, [calculateAtsScore]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('enhanced_resume_data', JSON.stringify(resumeData));
      localStorage.setItem('enhanced_resume_settings', JSON.stringify(settings));
      setLastSaved(new Date());
    }, 2000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [resumeData, settings]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('enhanced_resume_data');
    const savedSettings = localStorage.getItem('enhanced_resume_settings');
    
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved resume data:', error);
      }
    }
    
    if (savedSettings) {
      try {
        setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
      } catch (error) {
        console.error('Error loading saved settings:', error);
      }
    }
  }, []);

  // Update functions
  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleSection = (sectionId: string) => {
    setSettings(prev => ({
      ...prev,
      enabledSections: {
        ...prev.enabledSections,
        [sectionId]: !prev.enabledSections[sectionId]
      }
    }));
  };

  const resetForm = () => {
    setResumeData({
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
      },
      summary: "",
      experience: [],
      education: [],
      skills: {
        technical: [],
        soft: [],
        languages: [],
        frameworks: [],
      },
      projects: [],
      certifications: [],
      languages: [],
      volunteer: [],
    });
    setActiveSection('personal');
  };

  const generatePDF = async () => {
    if (!previewRef.current) return;
    
    setIsGeneratingPdf(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF } = await import('jspdf');
      
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
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
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const fileName = resumeData.personalInfo.name ? 
        `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf` : 
        'Resume.pdf';
        
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const progress = calculateProgress();
  const getAtsScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getSectionIcon = (sectionId: string, completed: boolean) => {
    const config = SECTION_CONFIGS.find(s => s.id === sectionId);
    const IconComponent = config?.icon || Circle;
    return completed ? (
      <CheckCircle2 className="w-4 h-4 text-green-600" />
    ) : (
      <IconComponent className="w-4 h-4 text-gray-400" />
    );
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <EnhancedPersonalInfoSection
            data={resumeData.personalInfo}
            onUpdate={(data) => updateResumeData('personalInfo', data)}
          />
        );
      case 'summary':
        return (
          <EnhancedSummarySection
            data={resumeData.summary}
            onUpdate={(data) => updateResumeData('summary', data)}
          />
        );
      case 'experience':
        return (
          <EnhancedExperienceSection
            data={resumeData.experience}
            onUpdate={(data) => updateResumeData('experience', data)}
          />
        );
      case 'education':
        return (
          <EnhancedEducationSection
            data={resumeData.education}
            onUpdate={(data) => updateResumeData('education', data)}
          />
        );
      case 'skills':
        return (
          <EnhancedSkillsSection
            data={resumeData.skills}
            onUpdate={(data) => updateResumeData('skills', data)}
          />
        );
      case 'projects':
        return (
          <EnhancedProjectsSection
            data={resumeData.projects}
            onUpdate={(data) => updateResumeData('projects', data)}
          />
        );
      case 'certifications':
        return (
          <EnhancedCertificationsSection
            data={resumeData.certifications}
            onUpdate={(data) => updateResumeData('certifications', data)}
          />
        );
      case 'languages':
        return (
          <EnhancedLanguagesSection
            data={resumeData.languages}
            onUpdate={(data) => updateResumeData('languages', data)}
          />
        );
      case 'volunteer':
        return (
          <EnhancedVolunteerSection
            data={resumeData.volunteer}
            onUpdate={(data) => updateResumeData('volunteer', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-full px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onBack}
                  className="flex items-center gap-2 hover:bg-gray-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    Enhanced Resume Builder
                  </h1>
                  <p className="text-sm text-gray-600">
                    {template} Template • {progress.completedSections}/{progress.totalSections} sections complete
                  </p>
                  <p className="text-xs text-blue-600">
                    Current template: {settings.template}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Auto-save indicator */}
                <AnimatePresence>
                  {lastSaved && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-xs text-gray-500 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      Saved {lastSaved.toLocaleTimeString()}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ATS Score */}
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className={`text-sm font-medium ${getAtsScoreColor(atsScore)}`}>
                        ATS: {atsScore}%
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Applicant Tracking System compatibility score</p>
                  </TooltipContent>
                </Tooltip>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                  >
                    {isPreviewExpanded ? (
                      <Minimize2 className="w-4 h-4 mr-2" />
                    ) : (
                      <Maximize2 className="w-4 h-4 mr-2" />
                    )}
                    {isPreviewExpanded ? 'Minimize' : 'Expand'} Preview
                  </Button>

                  <Button 
                    onClick={generatePDF}
                    disabled={isGeneratingPdf}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isGeneratingPdf ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-8rem)]">
            {/* Left Panel - Form */}
            <ResizablePanel defaultSize={isPreviewExpanded ? 30 : 50} minSize={25}>
              <div className="h-full pr-3">
                <ScrollArea className="h-full">
                  <div className="space-y-6">
                    {/* Progress Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Target className="w-5 h-5 text-blue-600" />
                              Resume Progress
                            </CardTitle>
                            <Badge variant="outline" className="text-sm font-medium">
                              {progress.percentage}% Complete
                            </Badge>
                          </div>
                          <Progress value={progress.percentage} className="h-3" />
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {SECTION_CONFIGS.map((section) => {
                              const isEnabled = settings.enabledSections[section.id];
                              const isCompleted = progress.percentage > 0; // Simplified for demo
                              
                              return (
                                <motion.div
                                  key={section.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setActiveSection(section.id)}
                                    disabled={!isEnabled}
                                    className={`justify-start h-auto p-3 w-full ${
                                      activeSection === section.id 
                                        ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                                        : 'hover:bg-gray-50'
                                    } ${!isEnabled ? 'opacity-50' : ''}`}
                                  >
                                    <div className="flex items-center gap-2 w-full">
                                      {getSectionIcon(section.id, isCompleted)}
                                      <span className="text-sm font-medium">{section.label}</span>
                                      {!isEnabled && (
                                        <Badge variant="secondary" className="ml-auto text-xs">
                                          Disabled
                                        </Badge>
                                      )}
                                    </div>
                                  </Button>
                                </motion.div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* ATS Tips */}
                    <AnimatePresence>
                      {atsScore < 80 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <Alert className="border-amber-200 bg-amber-50">
                            <Zap className="h-4 w-4 text-amber-600" />
                            <AlertDescription className="text-amber-800">
                              <strong>ATS Optimization Tips:</strong>
                              {atsScore < 60 && " Add more detailed work experience descriptions."}
                              {Object.values(resumeData.skills).flat().length < 5 && " Include more relevant skills."}
                              {!resumeData.summary && " Write a compelling professional summary."}
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Section Form */}
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            {(() => {
                              const config = SECTION_CONFIGS.find(s => s.id === activeSection);
                              const IconComponent = config?.icon || FileText;
                              return <IconComponent className="w-5 h-5 text-blue-600" />;
                            })()}
                            {SECTION_CONFIGS.find(s => s.id === activeSection)?.label || 'Section'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {renderSectionContent()}
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline" 
                        onClick={resetForm}
                        className="flex-1"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset Form
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          localStorage.setItem('enhanced_resume_data', JSON.stringify(resumeData));
                          localStorage.setItem('enhanced_resume_settings', JSON.stringify(settings));
                          setLastSaved(new Date());
                        }}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Draft
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right Panel - Live Preview */}
            <ResizablePanel defaultSize={isPreviewExpanded ? 70 : 50} minSize={30}>
              <div className="h-full pl-3">
                <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="w-5 h-5 text-blue-600" />
                        Live Preview
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Scale:</span>
                        <Slider
                          value={[previewScale]}
                          onValueChange={([value]) => setPreviewScale(value)}
                          min={0.5}
                          max={1.2}
                          step={0.1}
                          className="w-20"
                        />
                        <span className="text-sm text-gray-600 w-12">
                          {Math.round(previewScale * 100)}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[calc(100vh-12rem)]">
                      <div className="p-6">
                        <motion.div
                          ref={previewRef}
                          style={{ transform: `scale(${previewScale})`, transformOrigin: 'top left' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <EnhancedResumePreview
                            data={resumeData}
                            settings={settings}
                          />
                        </motion.div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Settings Dialog */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Resume Settings
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {/* Template Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Template</label>
                <Select value={settings.template} onValueChange={(value) => updateSettings({ template: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal-professional">Minimal Professional</SelectItem>
                    <SelectItem value="modern-executive">Modern Executive</SelectItem>
                    <SelectItem value="technical-clean">Technical Clean</SelectItem>
                    <SelectItem value="academic-simple">Academic Simple</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Font Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Font Family</label>
                  <Select value={settings.fontFamily} onValueChange={(value) => updateSettings({ fontFamily: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium">Font Size: {settings.fontSize}pt</label>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={([value]) => updateSettings({ fontSize: value })}
                    min={9}
                    max={14}
                    step={0.5}
                  />
                </div>
              </div>

              {/* Color Scheme */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Color Scheme</label>
                <div className="grid grid-cols-4 gap-2">
                  {['blue', 'green', 'purple', 'red', 'orange', 'teal', 'pink', 'indigo'].map((color) => (
                    <Button
                      key={color}
                      variant={settings.colorScheme === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSettings({ colorScheme: color })}
                      className={`capitalize ${settings.colorScheme === color ? `bg-${color}-600` : ''}`}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Section Management */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Enabled Sections</label>
                <div className="grid grid-cols-2 gap-3">
                  {SECTION_CONFIGS.map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <section.icon className="w-4 h-4" />
                        <span className="text-sm">{section.label}</span>
                      </div>
                      <Switch
                        checked={settings.enabledSections[section.id]}
                        onCheckedChange={() => toggleSection(section.id)}
                        disabled={section.id === 'personal'} // Personal info is always required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};
