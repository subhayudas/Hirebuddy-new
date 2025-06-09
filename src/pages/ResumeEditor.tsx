
import { Header } from "@/components/layout/Header";
import { ResumeTemplates } from "@/components/resume/ResumeTemplates";
import { EnhancedResumeBuilder } from "@/components/resume/EnhancedResumeBuilder";
import { useState } from "react";

const ResumeEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Enhanced AI Resume Builder</h1>
          <p className="text-gray-600 mt-2">Create a professional resume with enhanced features, live preview, and real-time optimization.</p>
        </div>

        {!selectedTemplate ? (
          <ResumeTemplates onSelectTemplate={setSelectedTemplate} />
        ) : (
          <EnhancedResumeBuilder template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />
        )}
      </div>
    </div>
  );
};

export default ResumeEditor;
