import { cn } from "@/lib/utils";

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
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
  // Helper function to render contact links with custom text
  const renderContactLink = (href: string, text: string, type: string) => {
    return (
      <a 
        href={href}
        className="hover:underline text-inherit"
        data-link={href}
        data-link-type={type}
      >
        {text}
      </a>
    );
  };

  // ATS-friendly view (plain text formatting)
  if (showAtsView) {
    return (
      <div className="bg-white p-6 text-gray-800 font-mono text-sm whitespace-pre-wrap max-w-4xl mx-auto" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <div className="mb-6">
          <div className="font-bold text-lg">{data.personalInfo.name}</div>
          <div className="space-y-1">
            {data.personalInfo.email && <div>Email: {data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>Phone: {data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div>Location: {data.personalInfo.location}</div>}
            {data.personalInfo.website && <div>Portfolio: {data.personalInfo.website}</div>}
            {data.personalInfo.linkedin && <div>LinkedIn: {data.personalInfo.linkedin}</div>}
            {data.personalInfo.github && <div>GitHub: {data.personalInfo.github}</div>}
          </div>
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

  // Software Engineer Template
  return (
    <div className="w-full max-w-4xl">
      <div 
        id="resume-content" 
        className="bg-white text-black p-8 shadow-lg min-h-[11in] font-serif text-xs"
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top left',
          width: '210mm',
          minHeight: '297mm',
          padding: '15mm',
          margin: '0',
          boxSizing: 'border-box'
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold mb-2">{data.personalInfo.name || 'Your Name'}</h1>
            <div className="space-y-1 text-xs">
              {data.personalInfo.website && (
                <div>
                  <strong>Portfolio:</strong>{' '}
                  <a href={data.personalInfo.website.startsWith('http') ? data.personalInfo.website : `https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {data.personalInfo.website}
                  </a>
                </div>
              )}
              {data.personalInfo.github && (
                <div>
                  <strong>Github:</strong>{' '}
                  <a href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://github.com/${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {data.personalInfo.github}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="text-right text-xs space-y-1">
            {data.personalInfo.email && (
              <div>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${data.personalInfo.email}`} className="text-blue-600 underline">
                  {data.personalInfo.email}
                </a>
              </div>
            )}
            {data.personalInfo.phone && (
              <div><strong>Mobile:</strong> {data.personalInfo.phone}</div>
            )}
            {data.personalInfo.linkedin && (
              <div>
                <strong>Linkedin:</strong>{' '}
                <a href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://linkedin.com/in/${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {data.personalInfo.linkedin}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-black mb-2 pb-1">EDUCATION</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-xs">{edu.school}</div>
                  <div className="italic text-xs">{edu.degree}</div>
                </div>
                <div className="text-right text-xs">
                  <div>{edu.year}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Summary */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-black mb-2 pb-1">SKILLS SUMMARY</h2>
            <div className="space-y-1 text-xs">
              <div>
                <strong>Skills:</strong> {data.skills.join(', ')}
              </div>
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-black mb-2 pb-1">EXPERIENCE</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="font-bold text-xs">{exp.company}</div>
                    <div className="italic text-xs">{exp.jobTitle}</div>
                  </div>
                  <div className="text-right text-xs">
                    <div>{exp.duration}</div>
                  </div>
                </div>
                {exp.description && (
                  <div className="ml-3 mb-1">
                    <div className="text-xs">{exp.description}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-black mb-2 pb-1">PROFESSIONAL SUMMARY</h2>
            <div className="text-xs">{data.summary}</div>
          </div>
        )}
      </div>
    </div>
  );
};