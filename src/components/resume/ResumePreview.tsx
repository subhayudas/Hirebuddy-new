
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
  // Get template-specific styles
  const getTemplateStyles = () => {
    switch (template) {
      case "modern":
        return {
          container: "font-sans bg-white text-gray-800",
          header: "bg-blue-600 text-white p-6",
          headerName: "text-2xl font-bold",
          headerDetails: "mt-2 flex flex-wrap gap-3 text-sm",
          section: "p-6",
          sectionTitle: "text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3",
          experienceItem: "mb-4",
          experienceTitle: "font-bold",
          experienceCompany: "text-blue-600",
          experienceDuration: "text-sm text-gray-600 italic",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-3",
          educationDegree: "font-bold",
          educationSchool: "text-blue-600",
          educationYear: "text-sm text-gray-600 italic",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
        };
      case "classic":
        return {
          container: "font-serif bg-white text-gray-800",
          header: "text-center p-6 border-b-2 border-gray-300",
          headerName: "text-3xl font-bold",
          headerDetails: "mt-2 flex justify-center flex-wrap gap-4 text-sm",
          section: "p-6",
          sectionTitle: "text-xl font-bold border-b border-gray-300 pb-1 mb-4",
          experienceItem: "mb-4",
          experienceTitle: "font-bold",
          experienceCompany: "font-semibold",
          experienceDuration: "text-sm text-gray-600",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-3",
          educationDegree: "font-bold",
          educationSchool: "font-semibold",
          educationYear: "text-sm text-gray-600",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "border border-gray-300 px-2 py-1 rounded text-sm"
        };
      case "creative":
        return {
          container: "font-sans bg-white text-gray-800",
          header: "bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-t-lg",
          headerName: "text-2xl font-bold",
          headerDetails: "mt-2 flex flex-wrap gap-3 text-sm",
          section: "p-6",
          sectionTitle: "text-lg font-bold text-indigo-600 border-b border-indigo-200 pb-1 mb-3",
          experienceItem: "mb-4",
          experienceTitle: "font-bold",
          experienceCompany: "text-indigo-600",
          experienceDuration: "text-sm text-gray-600 italic",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-3",
          educationDegree: "font-bold",
          educationSchool: "text-indigo-600",
          educationYear: "text-sm text-gray-600 italic",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm"
        };
      case "minimal":
        return {
          container: "font-sans bg-white text-gray-800",
          header: "p-6 border-b border-gray-200",
          headerName: "text-2xl font-bold",
          headerDetails: "mt-2 flex flex-wrap gap-3 text-sm text-gray-600",
          section: "p-6",
          sectionTitle: "text-lg font-medium text-gray-700 mb-3",
          experienceItem: "mb-4",
          experienceTitle: "font-medium",
          experienceCompany: "text-gray-700",
          experienceDuration: "text-sm text-gray-500",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-3",
          educationDegree: "font-medium",
          educationSchool: "text-gray-700",
          educationYear: "text-sm text-gray-500",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
        };
      case "professional":
        return {
          container: "font-sans bg-white text-gray-800",
          header: "bg-gray-800 text-white p-6",
          headerName: "text-2xl font-bold",
          headerDetails: "mt-2 flex flex-wrap gap-3 text-sm",
          section: "p-6",
          sectionTitle: "text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3",
          experienceItem: "mb-4",
          experienceTitle: "font-bold",
          experienceCompany: "text-gray-700 font-medium",
          experienceDuration: "text-sm text-gray-600",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-3",
          educationDegree: "font-bold",
          educationSchool: "text-gray-700 font-medium",
          educationYear: "text-sm text-gray-600",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
        };
      case "technical":
        return {
          container: "font-mono bg-white text-gray-800",
          header: "bg-gray-900 text-white p-6",
          headerName: "text-2xl font-bold",
          headerDetails: "mt-2 flex flex-wrap gap-3 text-sm",
          section: "p-6",
          sectionTitle: "text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3",
          experienceItem: "mb-4",
          experienceTitle: "font-bold",
          experienceCompany: "text-gray-700",
          experienceDuration: "text-sm text-gray-600",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-3",
          educationDegree: "font-bold",
          educationSchool: "text-gray-700",
          educationYear: "text-sm text-gray-600",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "bg-gray-200 text-gray-800 px-2 py-1 rounded-sm text-sm font-medium border-l-2 border-gray-900"
        };
      case "academic":
        return {
          container: "font-serif bg-white text-gray-800",
          header: "text-center p-6 border-b border-gray-300",
          headerName: "text-3xl font-bold",
          headerDetails: "mt-2 flex justify-center flex-wrap gap-4 text-sm",
          section: "p-6",
          sectionTitle: "text-xl font-bold text-gray-800 pb-1 mb-4 uppercase tracking-wide",
          experienceItem: "mb-4",
          experienceTitle: "font-bold",
          experienceCompany: "font-semibold",
          experienceDuration: "text-sm text-gray-600",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-3",
          educationDegree: "font-bold",
          educationSchool: "font-semibold",
          educationYear: "text-sm text-gray-600",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "border border-gray-300 px-2 py-1 text-sm"
        };
      case "federal":
        return {
          container: "font-sans bg-white text-gray-800",
          header: "p-6 border-b-2 border-gray-700",
          headerName: "text-2xl font-bold uppercase",
          headerDetails: "mt-2 flex flex-wrap gap-3 text-sm",
          section: "p-6",
          sectionTitle: "text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase",
          experienceItem: "mb-6",
          experienceTitle: "font-bold uppercase",
          experienceCompany: "font-medium",
          experienceDuration: "text-sm text-gray-600",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-3",
          educationDegree: "font-bold uppercase",
          educationSchool: "font-medium",
          educationYear: "text-sm text-gray-600",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "bg-gray-100 text-gray-800 px-2 py-1 text-sm"
        };
      case "academic-clean":
        return {
          container: "font-serif bg-white text-gray-800",
          header: "px-6 pt-6 pb-2",
          headerName: "text-3xl font-bold text-center",
          headerDetails: "mt-1 flex justify-center flex-wrap gap-4 text-sm",
          section: "px-6 py-2",
          sectionTitle: "text-lg font-bold text-gray-800 border-b border-gray-400 pb-1 mb-2 uppercase",
          experienceItem: "mb-3",
          experienceTitle: "font-bold italic",
          experienceCompany: "font-normal",
          experienceDuration: "text-sm text-gray-600 italic",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-2",
          educationDegree: "font-bold",
          educationSchool: "font-normal italic",
          educationYear: "text-sm text-gray-600",
          skillsContainer: "flex flex-col",
          skill: "text-sm mb-1 flex items-center before:content-['•'] before:mr-2 before:text-gray-500"
        };
      default:
        return {
          container: "font-sans bg-white text-gray-800",
          header: "p-6",
          headerName: "text-2xl font-bold",
          headerDetails: "mt-2 flex flex-wrap gap-3 text-sm",
          section: "p-6",
          sectionTitle: "text-lg font-bold mb-3",
          experienceItem: "mb-4",
          experienceTitle: "font-bold",
          experienceCompany: "",
          experienceDuration: "text-sm text-gray-600",
          experienceDescription: "mt-1 text-sm",
          educationItem: "mb-3",
          educationDegree: "font-bold",
          educationSchool: "",
          educationYear: "text-sm text-gray-600",
          skillsContainer: "flex flex-wrap gap-2",
          skill: "bg-gray-100 px-2 py-1 rounded text-sm"
        };
    }
  };

  const styles = getTemplateStyles();

  // ATS-friendly view (plain text formatting)
  if (showAtsView) {
    return (
      <div className="bg-white p-6 text-gray-800 font-mono text-sm whitespace-pre-wrap" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
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
    <div className={cn(styles.container, "shadow-lg")} style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <header className={styles.header}>
        <h1 className={styles.headerName}>{data.personalInfo.name || "Your Name"}</h1>
        <div className={styles.headerDetails}>
          {data.personalInfo.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data.personalInfo.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Professional Summary</h2>
        <p className="text-sm">{data.summary || "Add a professional summary to highlight your key skills and experience."}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        {data.experience && data.experience.length > 0 ? (
          data.experience.map((exp, index) => (
            <div key={index} className={styles.experienceItem}>
              <div className="flex justify-between items-start">
                <div>
                  <div className={styles.experienceTitle}>{exp.jobTitle || "Job Title"}</div>
                  <div className={styles.experienceCompany}>{exp.company || "Company Name"}</div>
                </div>
                <div className={styles.experienceDuration}>{exp.duration || "Duration"}</div>
              </div>
              <p className={styles.experienceDescription}>{exp.description || "Describe your responsibilities and achievements."}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">Add your work experience to showcase your professional background.</p>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
        {data.education && data.education.length > 0 ? (
          data.education.map((edu, index) => (
            <div key={index} className={styles.educationItem}>
              <div className="flex justify-between items-start">
                <div>
                  <div className={styles.educationDegree}>{edu.degree || "Degree"}</div>
                  <div className={styles.educationSchool}>{edu.school || "School Name"}</div>
                </div>
                <div className={styles.educationYear}>{edu.year || "Year"}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">Add your educational background to highlight your qualifications.</p>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        {data.skills && data.skills.length > 0 ? (
          <div className={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <span key={index} className={styles.skill}>{skill}</span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">Add your key skills to demonstrate your expertise.</p>
        )}
      </section>
    </div>
  );
};
