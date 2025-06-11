import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeDropzone } from "./ResumeDropzone";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { FileText, Zap, Shield } from "lucide-react";
import type { Resume } from "../../../types/resume";

interface ResumeImportProps {
  onResumeImported?: (resume: Resume) => void;
  showCreateFromScratch?: boolean;
}

export const ResumeImport = ({ 
  onResumeImported, 
  showCreateFromScratch = true 
}: ResumeImportProps) => {
  const [hasAddedResume, setHasAddedResume] = useState(false);
  const navigate = useNavigate();

  const handleResumeExtracted = (resume: Resume) => {
    setHasAddedResume(true);
    onResumeImported?.(resume);
    
    // Store the parsed resume data in localStorage for the resume builder
    localStorage.setItem('parsedResumeData', JSON.stringify(resume));
    
    // Navigate to resume editor (not resume-builder)
    navigate('/resume-editor');
  };

  const handleCreateFromScratch = () => {
    // Clear any existing parsed data
    localStorage.removeItem('parsedResumeData');
    navigate('/resume-editor');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Import Your Resume
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your existing resume PDF and we'll automatically extract all the information 
          to help you create a new, professional resume quickly.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Resume PDF
          </CardTitle>
          <CardDescription>
            Our AI-powered parser will extract your information automatically
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResumeDropzone onResumeExtracted={handleResumeExtracted} />
        </CardContent>
      </Card>

      {showCreateFromScratch && !hasAddedResume && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">or</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Start from Scratch</CardTitle>
              <CardDescription>
                Don't have a resume yet? Create one from the beginning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleCreateFromScratch}
                variant="outline" 
                className="w-full"
              >
                Create New Resume
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold">Fast & Accurate</h3>
          <p className="text-sm text-gray-600">
            Our AI parser quickly extracts all relevant information from your resume
          </p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold">Privacy First</h3>
          <p className="text-sm text-gray-600">
            All processing happens locally in your browser - your data never leaves your device
          </p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold">Easy Editing</h3>
          <p className="text-sm text-gray-600">
            Review and edit the extracted information before creating your new resume
          </p>
        </div>
      </div>
    </div>
  );
}; 