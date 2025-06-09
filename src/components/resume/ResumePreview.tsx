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
  // Get template-specific styles - Four distinct minimal designs
  const getTemplateStyles = () => {
    switch (template) {
      case "minimal-professional":
        return {
          container: "font-sans bg-white text-gray-900 leading-relaxed max-w-4xl mx-auto p-8",
          header: "text-left mb-8 pb-4 border-b border-gray-300",
          headerName: "text-3xl font-bold text-gray-900 mb-2 tracking-tight",
          headerDetails: "text-sm text-gray-600 space-y-1",
          section: "mb-8",
          sectionTitle: "text-lg font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide",
          experienceItem: "mb-6",
          experienceHeader: "flex justify-between items-start mb-2",
          experienceTitle: "font-semibold text-gray-900 text-base",
          experienceCompany: "text-gray-700 font-medium",
          experienceDuration: "text-sm text-gray-500 italic",
          experienceDescription: "text-sm text-gray-700 mt-2 leading-relaxed",
          educationItem: "mb-4",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-semibold text-gray-900",
          educationSchool: "text-gray-700",
          educationYear: "text-sm text-gray-500 italic",
          skillsContainer: "text-sm text-gray-700",
          skill: "inline-block mr-6 mb-2"
        };
      
      case "modern-executive":
        return {
          container: "font-serif bg-white text-gray-900 leading-relaxed max-w-4xl mx-auto p-8",
          header: "text-center mb-10 pb-6 border-b-2 border-gray-900",
          headerName: "text-4xl font-bold text-gray-900 mb-3 tracking-wide",
          headerDetails: "text-sm text-gray-600 space-y-1 max-w-md mx-auto",
          section: "mb-10",
          sectionTitle: "text-xl font-bold text-gray-900 mb-5 pb-2 border-b-2 border-gray-900 text-center uppercase tracking-widest",
          experienceItem: "mb-8",
          experienceHeader: "text-center mb-3",
          experienceTitle: "text-lg font-bold text-gray-900 block",
          experienceCompany: "text-gray-700 font-medium text-base block mt-1",
          experienceDuration: "text-sm text-gray-500 italic block mt-1",
          experienceDescription: "text-sm text-gray-700 mt-3 leading-relaxed text-center max-w-3xl mx-auto",
          educationItem: "mb-6 text-center",
          educationHeader: "block",
          educationDegree: "font-bold text-gray-900 text-base block",
          educationSchool: "text-gray-700 font-medium block mt-1",
          educationYear: "text-sm text-gray-500 italic block mt-1",
          skillsContainer: "text-center",
          skill: "inline-block mx-3 mb-2 text-sm text-gray-700"
        };

      case "technical-clean":
        return {
          container: "font-mono bg-white text-gray-900 text-sm leading-normal max-w-4xl mx-auto p-8",
          header: "mb-8 pb-4 border-b-2 border-gray-900",
          headerName: "text-2xl font-bold text-gray-900 mb-2 tracking-wider uppercase",
          headerDetails: "text-xs text-gray-600 space-y-1 font-mono",
          section: "mb-8",
          sectionTitle: "text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 pb-1 border-b border-gray-400",
          experienceItem: "mb-6",
          experienceHeader: "flex justify-between items-start mb-1",
          experienceTitle: "font-bold text-gray-900 text-sm uppercase tracking-wide",
          experienceCompany: "text-gray-700 text-sm",
          experienceDuration: "text-xs text-gray-500 font-mono",
          experienceDescription: "text-xs text-gray-700 mt-2 leading-relaxed font-mono",
          educationItem: "mb-4",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-bold text-gray-900 text-sm uppercase tracking-wide",
          educationSchool: "text-gray-700 text-sm",
          educationYear: "text-xs text-gray-500 font-mono",
          skillsContainer: "grid grid-cols-3 gap-2",
          skill: "text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded font-mono text-center"
        };

      case "academic-simple":
        return {
          container: "font-serif bg-white text-gray-900 leading-relaxed max-w-4xl mx-auto p-8",
          header: "text-center mb-8 pb-4 border-b border-gray-400",
          headerName: "text-2xl font-bold text-gray-900 mb-2 tracking-wide",
          headerDetails: "text-sm text-gray-600 space-y-1",
          section: "mb-8",
          sectionTitle: "text-base font-bold text-gray-900 mb-4 pb-1 border-b border-gray-300 uppercase tracking-wide",
          experienceItem: "mb-6",
          experienceHeader: "flex justify-between items-start mb-1",
          experienceTitle: "font-semibold text-gray-900",
          experienceCompany: "text-gray-700 italic",
          experienceDuration: "text-sm text-gray-500 italic",
          experienceDescription: "text-sm text-gray-700 mt-2 leading-relaxed",
          educationItem: "mb-4",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-semibold text-gray-900",
          educationSchool: "text-gray-700 italic",
          educationYear: "text-sm text-gray-500 italic",
          skillsContainer: "text-sm text-gray-700",
          skill: "inline-block mr-4 mb-1"
        };

      default:
        // Default to minimal-professional template
        return {
          container: "font-sans bg-white text-gray-900 leading-relaxed max-w-4xl mx-auto p-8",
          header: "text-left mb-8 pb-4 border-b border-gray-300",
          headerName: "text-3xl font-bold text-gray-900 mb-2 tracking-tight",
          headerDetails: "text-sm text-gray-600 space-y-1",
          section: "mb-8",
          sectionTitle: "text-lg font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide",
          experienceItem: "mb-6",
          experienceHeader: "flex justify-between items-start mb-2",
          experienceTitle: "font-semibold text-gray-900 text-base",
          experienceCompany: "text-gray-700 font-medium",
          experienceDuration: "text-sm text-gray-500 italic",
          experienceDescription: "text-sm text-gray-700 mt-2 leading-relaxed",
          educationItem: "mb-4",
          educationHeader: "flex justify-between items-start",
          educationDegree: "font-semibold text-gray-900",
          educationSchool: "text-gray-700",
          educationYear: "text-sm text-gray-500 italic",
          skillsContainer: "text-sm text-gray-700",
          skill: "inline-block mr-6 mb-2"
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
            {template === "academic-simple" || template === "modern-executive" ? (
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
                {exp.description ? (
                  <div className={styles.experienceDescription}>
                    {exp.description.split('\n').map((item, i) => (
                      <div key={i} className="flex items-start mb-1">
                        {item.trim().startsWith('•') ? (
                          <>
                            <span className="mr-2">{item.trim().substring(0, 1)}</span>
                            <span>{item.trim().substring(1).trim()}</span>
                          </>
                        ) : (
                          <span>{item}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.experienceDescription}>
                    Describe your key responsibilities, achievements, and impact in this role.
                  </p>
                )}
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
              {template === "academic-simple" ? (
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