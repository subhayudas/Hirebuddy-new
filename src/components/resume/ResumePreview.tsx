
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Calendar, Building } from "lucide-react";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Array<{
    title: string;
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
}

export const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  const getTemplateStyles = () => {
    switch (template) {
      case "modern":
        return {
          container: "bg-white text-gray-900 font-sans",
          header: "bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6",
          section: "mb-6",
          sectionTitle: "text-lg font-bold text-blue-700 mb-3 pb-1 border-b-2 border-blue-200"
        };
      case "classic":
        return {
          container: "bg-white text-gray-900 font-serif",
          header: "border-b-2 border-gray-300 pb-4 mb-6",
          section: "mb-6",
          sectionTitle: "text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide"
        };
      case "creative":
        return {
          container: "bg-gradient-to-br from-purple-50 to-pink-50 text-gray-900 font-sans",
          header: "bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-lg",
          section: "mb-6",
          sectionTitle: "text-lg font-bold text-purple-700 mb-3 pb-1 border-b-2 border-purple-200"
        };
      default:
        return {
          container: "bg-white text-gray-900 font-sans",
          header: "border-b border-gray-200 pb-4 mb-6",
          section: "mb-6",
          sectionTitle: "text-lg font-semibold text-gray-800 mb-3"
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <Card className="h-full overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className={`min-h-full ${styles.container}`} style={{ aspectRatio: '8.5/11' }}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className="text-2xl font-bold mb-2">{data.name || "Your Name"}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              {data.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{data.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Professional Summary */}
            {data.summary && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Professional Summary</h2>
                <p className="text-sm leading-relaxed">{data.summary}</p>
              </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Work Experience</h2>
                <div className="space-y-4">
                  {data.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-sm">{exp.title}</h3>
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Building className="w-3 h-3 text-gray-500" />
                        <span className="text-sm text-gray-700 font-medium">{exp.company}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Education</h2>
                <div className="space-y-3">
                  {data.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">{edu.degree}</h3>
                        <p className="text-sm text-gray-700">{edu.school}</p>
                      </div>
                      <span className="text-xs text-gray-600">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
