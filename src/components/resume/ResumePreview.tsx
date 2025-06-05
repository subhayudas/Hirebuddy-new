import { cn } from "@/lib/utils";

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    jobTitle: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
}

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
  scale?: number;
  showAtsView?: boolean;
}

export const ResumePreview = ({ data, template, scale = 1, showAtsView = false }: ResumePreviewProps) => {
  // Get template-specific styles with new Overleaf-inspired designs
  const getTemplateStyles = () => {
    switch (template) {
      case "academic-modern":
        return {
          container: "font-serif bg-white text-gray-900 leading-relaxed",
          header: "text-center pb-4 mb-6 border-b border-gray-300",
          headerName: "text-2xl font-bold tracking-wide uppercase text-gray-900 mb-2",
          headerDetails: "text-sm text-gray-700 space-y-1",
          section: "mb-6",
          sectionTitle: "text-base font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-1 mb-3",
          experienceItem: "mb-4",
          experienceHeader: "flex justify-between items-start mb-1",
          experienceTitle: "font-semibold text-gray-900",
          experienceCompany: "text-gray-800 italic",
          experienceDuration: "text-sm text-gray-600 italic",
          experienceDescription: "text-sm text-gray-800 mt-1 leading-relaxed",
          educationItem: "mb-3",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-semibold text-gray-900",
          educationSchool: "text-gray-800 italic",
          educationYear: "text-sm text-gray-600 italic",
          skillsContainer: "text-sm text-gray-800",
          skill: "inline-block mr-4 mb-1"
        };
      
      case "professional-clean":
        return {
          container: "font-sans bg-white text-gray-900 leading-normal",
          header: "mb-6 pb-4 border-b-2 border-gray-200",
          headerName: "text-2xl font-bold text-gray-900 mb-2",
          headerDetails: "text-sm text-gray-700 flex flex-wrap gap-4 justify-center",
          section: "mb-6",
          sectionTitle: "text-lg font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-300",
          experienceItem: "mb-4",
          experienceHeader: "flex justify-between items-start mb-1",
          experienceTitle: "font-semibold text-gray-900",
          experienceCompany: "text-gray-800",
          experienceDuration: "text-sm text-gray-600",
          experienceDescription: "text-sm text-gray-800 mt-1",
          educationItem: "mb-3",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-semibold text-gray-900",
          educationSchool: "text-gray-800",
          educationYear: "text-sm text-gray-600",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
        };

      case "technical-modern":
        return {
          container: "font-mono bg-white text-gray-900 text-sm leading-normal",
          header: "mb-6 pb-4 border-b-2 border-gray-800",
          headerName: "text-xl font-bold text-gray-900 mb-2 tracking-wide",
          headerDetails: "text-sm text-gray-700 space-y-1",
          section: "mb-6",
          sectionTitle: "text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 pb-1 border-b border-gray-400",
          experienceItem: "mb-4",
          experienceHeader: "flex justify-between items-start mb-1",
          experienceTitle: "font-bold text-gray-900",
          experienceCompany: "text-gray-800",
          experienceDuration: "text-xs text-gray-600",
          experienceDescription: "text-xs text-gray-800 mt-1 leading-relaxed",
          educationItem: "mb-2",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-bold text-gray-900",
          educationSchool: "text-gray-800",
          educationYear: "text-xs text-gray-600",
          skillsContainer: "grid grid-cols-2 gap-1",
          skill: "text-xs text-gray-800 bg-gray-100 px-2 py-1 rounded font-mono"
        };

      case "executive-elite":
        return {
          container: "font-serif bg-white text-gray-900 leading-relaxed",
          header: "text-center mb-8 pb-6 border-b-2 border-gray-800",
          headerName: "text-3xl font-bold text-gray-900 mb-3 tracking-wide",
          headerDetails: "text-sm text-gray-700 space-y-1",
          section: "mb-8",
          sectionTitle: "text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-800",
          experienceItem: "mb-6",
          experienceHeader: "flex justify-between items-start mb-2",
          experienceTitle: "text-lg font-bold text-gray-900",
          experienceCompany: "text-gray-800 font-medium",
          experienceDuration: "text-sm text-gray-600 italic",
          experienceDescription: "text-sm text-gray-800 mt-2 leading-relaxed",
          educationItem: "mb-4",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-bold text-gray-900",
          educationSchool: "text-gray-800 font-medium",
          educationYear: "text-sm text-gray-600 italic",
          skillsContainer: "flex flex-wrap gap-3",
          skill: "text-sm text-gray-800 border border-gray-300 px-3 py-1 rounded"
        };

      case "creative-minimal":
        return {
          container: "font-sans bg-white text-gray-900 leading-normal",
          header: "mb-6 pb-4",
          headerName: "text-2xl font-light text-gray-900 mb-2 tracking-wide",
          headerDetails: "text-sm text-gray-600 space-y-1",
          section: "mb-6",
          sectionTitle: "text-base font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200",
          experienceItem: "mb-4",
          experienceHeader: "flex justify-between items-start mb-1",
          experienceTitle: "font-medium text-gray-900",
          experienceCompany: "text-gray-700",
          experienceDuration: "text-sm text-gray-500",
          experienceDescription: "text-sm text-gray-700 mt-1",
          educationItem: "mb-3",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-medium text-gray-900",
          educationSchool: "text-gray-700",
          educationYear: "text-sm text-gray-500",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded-full"
        };

      case "consulting-pro":
        return {
          container: "font-sans bg-white text-gray-900 leading-normal",
          header: "mb-6 pb-4 border-b border-gray-300",
          headerName: "text-2xl font-bold text-gray-900 mb-2",
          headerDetails: "text-sm text-gray-700 flex flex-wrap gap-4",
          section: "mb-6",
          sectionTitle: "text-base font-bold text-gray-900 mb-3 pb-1 border-b border-gray-400",
          experienceItem: "mb-5",
          experienceHeader: "flex justify-between items-start mb-1",
          experienceTitle: "font-bold text-gray-900",
          experienceCompany: "text-gray-800 font-medium",
          experienceDuration: "text-sm text-gray-600",
          experienceDescription: "text-sm text-gray-800 mt-1",
          educationItem: "mb-3",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-bold text-gray-900",
          educationSchool: "text-gray-800 font-medium",
          educationYear: "text-sm text-gray-600",
          skillsContainer: "grid grid-cols-3 gap-2",
          skill: "text-sm text-gray-800 bg-blue-50 px-2 py-1 rounded text-center"
        };

      // Legacy templates for backward compatibility
      case "modern":
        return {
          container: "font-sans bg-white text-gray-800",
          header: "bg-blue-600 text-white p-6",
          headerName: "text-2xl font-bold",
          headerDetails: "mt-2 flex flex-wrap gap-3 text-sm",
          section: "p-6",
          sectionTitle: "text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3",
          experienceItem: "mb-4",
          experienceHeader: "flex justify-between items-start mb-1",
          experienceTitle: "font-bold",
          experienceCompany: "text-blue-600",
          experienceDuration: "text-sm text-gray-600 italic",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-3",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-bold",
          educationSchool: "text-blue-600",
          educationYear: "text-sm text-gray-600 italic",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
        };

      default:
        return {
          container: "font-serif bg-white text-gray-900 leading-relaxed",
          header: "text-center pb-4 mb-6 border-b border-gray-300",
          headerName: "text-2xl font-bold tracking-wide uppercase text-gray-900 mb-2",
          headerDetails: "text-sm text-gray-700 space-y-1",
          section: "mb-6",
          sectionTitle: "text-base font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-1 mb-3",
          experienceItem: "mb-4",
          experienceHeader: "flex justify-between items-start mb-1",
          experienceTitle: "font-semibold text-gray-900",
          experienceCompany: "text-gray-800 italic",
          experienceDuration: "text-sm text-gray-600 italic",
          experienceDescription: "text-sm text-gray-800 mt-1 leading-relaxed",
          educationItem: "mb-3",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-semibold text-gray-900",
          educationSchool: "text-gray-800 italic",
          educationYear: "text-sm text-gray-600 italic",
          skillsContainer: "text-sm text-gray-800",
          skill: "inline-block mr-4 mb-1"
        };
    }
  };

  const styles = getTemplateStyles();

  // ATS-friendly view (plain text formatting)
  if (showAtsView) {
    return (
      <div className="bg-white p-6 text-gray-800 font-mono text-sm whitespace-pre-wrap max-w-4xl mx-auto" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <div className="mb-6">
          <div className="font-bold text-lg">{data.personalInfo.name}</div>
          <div>{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}</div>
        </div>
        
        <div className="mb-6">
          <div className="font-bold uppercase mb-1">PROFESSIONAL SUMMARY</div>
          <div>{data.summary}</div>
        </div>
        
        <div className="mb-6">
          <div className="font-bold uppercase mb-1">EXPERIENCE</div>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div>{exp.jobTitle} - {exp.company} ({exp.duration})</div>
              <div>{exp.description}</div>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <div className="font-bold uppercase mb-1">EDUCATION</div>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div>{edu.degree} - {edu.school} ({edu.year})</div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="font-bold uppercase mb-1">SKILLS</div>
          <div>{data.skills.join(", ")}</div>
        </div>
      </div>
    );
  }

  // Styled resume based on template
  return (
    <div className="max-w-4xl mx-auto">
      <div className={cn(styles.container, "shadow-lg min-h-[11in] p-8")} style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.headerName}>
            {data.personalInfo.name || "Your Name"}
          </h1>
          <div className={styles.headerDetails}>
            {template === "academic-modern" || template === "executive-elite" || template === "creative-minimal" ? (
              <div className="space-y-1 text-center">
                {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
                {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
              </div>
            ) : (
              <>
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
              </>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Professional Summary</h2>
          <p className="text-sm leading-relaxed">
            {data.summary || "Add a professional summary to highlight your key skills and experience that align with your target role."}
          </p>
        </section>

        {/* Experience */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {data.experience && data.experience.length > 0 ? (
            data.experience.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <div>
                    <div className={styles.experienceTitle}>{exp.jobTitle || "Job Title"}</div>
                    <div className={styles.experienceCompany}>{exp.company || "Company Name"}</div>
                  </div>
                  <div className={styles.experienceDuration}>{exp.duration || "Duration"}</div>
                </div>
                <p className={styles.experienceDescription}>
                  {exp.description || "Describe your key responsibilities, achievements, and impact in this role."}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic leading-relaxed">
              Add your work experience to showcase your professional background and achievements.
            </p>
          )}
        </section>

        {/* Education */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {data.education && data.education.length > 0 ? (
            data.education.map((edu, index) => (
              <div key={index} className={styles.educationItem}>
                <div className={styles.educationHeader}>
                  <div>
                    <div className={styles.educationDegree}>{edu.degree || "Degree"}</div>
                    <div className={styles.educationSchool}>{edu.school || "Institution Name"}</div>
                  </div>
                  <div className={styles.educationYear}>{edu.year || "Year"}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic leading-relaxed">
              Add your educational background to highlight your qualifications and academic achievements.
            </p>
          )}
        </section>

        {/* Skills */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          {data.skills && data.skills.length > 0 ? (
            <div className={styles.skillsContainer}>
              {template === "academic-modern" ? (
                data.skills.map((skill, index) => (
                  <span key={index} className={styles.skill}>
                    • {skill}
                  </span>
                ))
              ) : (
                data.skills.map((skill, index) => (
                  <span key={index} className={styles.skill}>
                    {skill}
                  </span>
                ))
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic leading-relaxed">
              Add your key skills and competencies to demonstrate your expertise and capabilities.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};