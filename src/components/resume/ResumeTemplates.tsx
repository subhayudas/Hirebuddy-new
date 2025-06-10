import { useEffect } from "react";

interface ResumeTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export const ResumeTemplates = ({ onSelectTemplate }: ResumeTemplatesProps) => {
  // Default template ID - using the first template (minimal-professional)
  const defaultTemplateId = "minimal-professional";
  
  // Automatically select the default template when component mounts
  useEffect(() => {
    onSelectTemplate(defaultTemplateId);
  }, [onSelectTemplate]);
  
  // Return null as we're bypassing the template selection UI
  return null;
};