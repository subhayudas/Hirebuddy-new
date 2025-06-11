
import { Header } from "@/components/layout/Header";
import { ResumeTemplates } from "@/components/resume/ResumeTemplates";
import { EnhancedResumeBuilder } from "@/components/resume/EnhancedResumeBuilder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResumeEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showImportOption, setShowImportOption] = useState(true);
  const navigate = useNavigate();

  // Check for parsed resume data on mount
  useEffect(() => {
    const parsedResumeData = localStorage.getItem('parsedResumeData');
    if (parsedResumeData) {
      // If we have parsed data, automatically select a template and show the builder
      setSelectedTemplate("perfect-fit");
      setShowImportOption(false);
    }
  }, []);

  const handleStartFromScratch = () => {
    setShowImportOption(false);
    setSelectedTemplate("perfect-fit");
  };

  const handleImportResume = () => {
    navigate("/resume-import");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Enhanced AI Resume Builder</h1>
          <p className="text-gray-600 mt-2">Create a professional resume with enhanced features, live preview, and real-time optimization.</p>
        </div>

        {showImportOption && !selectedTemplate ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleImportResume}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    Import Existing Resume
                  </CardTitle>
                  <CardDescription>
                    Upload your current resume PDF and we'll extract all the information automatically
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={handleImportResume}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Resume
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleStartFromScratch}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Start from Scratch
                  </CardTitle>
                  <CardDescription>
                    Create a new resume from the beginning with our guided builder
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={handleStartFromScratch}>
                    <FileText className="h-4 w-4 mr-2" />
                    Create New Resume
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : selectedTemplate ? (
          <EnhancedResumeBuilder template={selectedTemplate} onBack={() => {
            setSelectedTemplate(null);
            setShowImportOption(true);
          }} />
        ) : (
          <ResumeTemplates onSelectTemplate={setSelectedTemplate} />
        )}
      </div>
    </div>
  );
};

export default ResumeEditor;
