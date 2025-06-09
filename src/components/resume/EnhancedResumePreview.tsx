import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Calendar, ExternalLink } from 'lucide-react';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    websiteText?: string;
    linkedin: string;
    linkedinText?: string;
    github: string;
    githubText?: string;
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

interface EnhancedResumePreviewProps {
  data: ResumeData;
  settings: Settings;
}

const colorSchemes = {
  blue: {
    primary: '#2563eb',
    secondary: '#3b82f6',
    accent: '#dbeafe',
    text: '#1e40af'
  },
  green: {
    primary: '#059669',
    secondary: '#10b981',
    accent: '#d1fae5',
    text: '#047857'
  },
  purple: {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    accent: '#ede9fe',
    text: '#6d28d9'
  },
  red: {
    primary: '#dc2626',
    secondary: '#ef4444',
    accent: '#fee2e2',
    text: '#b91c1c'
  },
  orange: {
    primary: '#ea580c',
    secondary: '#f97316',
    accent: '#fed7aa',
    text: '#c2410c'
  },
  teal: {
    primary: '#0d9488',
    secondary: '#14b8a6',
    accent: '#ccfbf1',
    text: '#0f766e'
  },
  pink: {
    primary: '#db2777',
    secondary: '#ec4899',
    accent: '#fce7f3',
    text: '#be185d'
  },
  indigo: {
    primary: '#4f46e5',
    secondary: '#6366f1',
    accent: '#e0e7ff',
    text: '#4338ca'
  }
};

export const EnhancedResumePreview: React.FC<EnhancedResumePreviewProps> = ({ 
  data, 
  settings 
}) => {
  const colors = colorSchemes[settings.colorScheme as keyof typeof colorSchemes] || colorSchemes.blue;
  
  // Get template-specific styles - Four distinct minimal designs
  const getTemplateStyles = () => {
    switch (settings.template) {
      case "minimal-professional":
        return {
          container: "font-sans bg-white text-gray-900 leading-relaxed",
          header: "text-left mb-8 pb-4 border-b border-gray-300",
          headerName: "text-3xl font-bold text-gray-900 mb-2 tracking-tight",
          headerDetails: "text-sm text-gray-600 space-y-1",
          section: "mb-8",
          sectionTitle: "text-lg font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide",
          layout: "single-column"
        };
      
      case "modern-executive":
        return {
          container: "font-serif bg-white text-gray-900 leading-relaxed",
          header: "text-center mb-10 pb-6 border-b-2 border-gray-900",
          headerName: "text-4xl font-bold text-gray-900 mb-3 tracking-wide",
          headerDetails: "text-sm text-gray-600 space-y-1 max-w-md mx-auto",
          section: "mb-10",
          sectionTitle: "text-xl font-bold text-gray-900 mb-5 pb-2 border-b-2 border-gray-900 text-center uppercase tracking-widest",
          layout: "center-aligned"
        };

      case "technical-clean":
        return {
          container: "font-mono bg-white text-gray-900 text-sm leading-normal",
          header: "mb-8 pb-4 border-b-2 border-gray-900",
          headerName: "text-2xl font-bold text-gray-900 mb-2 tracking-wider uppercase",
          headerDetails: "text-xs text-gray-600 space-y-1 font-mono",
          section: "mb-8",
          sectionTitle: "text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 pb-1 border-b border-gray-400",
          layout: "compact"
        };

      case "academic-simple":
        return {
          container: "font-serif bg-white text-gray-900 leading-relaxed",
          header: "text-center mb-8 pb-4 border-b border-gray-400",
          headerName: "text-2xl font-bold text-gray-900 mb-2 tracking-wide",
          headerDetails: "text-sm text-gray-600 space-y-1",
          section: "mb-8",
          sectionTitle: "text-base font-bold text-gray-900 mb-4 pb-1 border-b border-gray-300 uppercase tracking-wide",
          layout: "traditional"
        };

      default:
        return {
          container: "font-sans bg-white text-gray-900 leading-relaxed",
          header: "text-left mb-8 pb-4 border-b border-gray-300",
          headerName: "text-3xl font-bold text-gray-900 mb-2 tracking-tight",
          headerDetails: "text-sm text-gray-600 space-y-1",
          section: "mb-8",
          sectionTitle: "text-lg font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide",
          layout: "single-column"
        };
    }
  };

  const templateStyles = getTemplateStyles();
  
  // Debug: Log the current template
  console.log('EnhancedResumePreview - Current template:', settings.template);
  console.log('EnhancedResumePreview - Template styles:', templateStyles);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const formatDateRange = (startDate: string, endDate: string, current: boolean = false) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  const renderContactInfo = () => {
    const contacts = [
      { icon: Mail, value: data.personalInfo.email, href: `mailto:${data.personalInfo.email}`, type: 'email', displayText: data.personalInfo.email },
      { icon: Phone, value: data.personalInfo.phone, href: `tel:${data.personalInfo.phone}`, type: 'phone', displayText: data.personalInfo.phone },
      { icon: MapPin, value: data.personalInfo.location, type: 'location', displayText: data.personalInfo.location },
      { 
        icon: Globe, 
        value: data.personalInfo.website, 
        href: data.personalInfo.website?.startsWith('http') ? data.personalInfo.website : `https://${data.personalInfo.website}`, 
        type: 'website',
        displayText: data.personalInfo.websiteText || data.personalInfo.website
      },
      { 
        icon: Linkedin, 
        value: data.personalInfo.linkedin, 
        href: data.personalInfo.linkedin?.startsWith('http') ? data.personalInfo.linkedin : `https://linkedin.com/in/${data.personalInfo.linkedin}`, 
        type: 'linkedin',
        displayText: data.personalInfo.linkedinText || 'LinkedIn Profile'
      },
      { 
        icon: Github, 
        value: data.personalInfo.github, 
        href: data.personalInfo.github?.startsWith('http') ? data.personalInfo.github : `https://github.com/${data.personalInfo.github}`, 
        type: 'github',
        displayText: data.personalInfo.githubText || 'GitHub Profile'
      },
    ].filter(contact => contact.value);

    // Template-specific contact layout
    if (templateStyles.layout === "center-aligned" || templateStyles.layout === "traditional") {
      return (
        <div className="space-y-1 text-center">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-gray-600"
            >
              {contact.href ? (
                <a 
                  href={contact.href} 
                  className="hover:underline text-inherit"
                  data-link={contact.href}
                  data-link-type={contact.type}
                >
                  {contact.displayText}
                </a>
              ) : (
                <span>{contact.displayText}</span>
              )}
            </motion.div>
          ))}
        </div>
      );
    }

    return (
      <div className={`flex flex-wrap gap-3 text-sm text-gray-600 items-center ${templateStyles.layout === "compact" ? "font-mono text-xs" : ""}`}>
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-1"
          >
            {templateStyles.layout !== "compact" && (
              <contact.icon 
                className="w-3 h-3 text-gray-600 flex-shrink-0" 
                style={{ verticalAlign: 'middle' }}
              />
            )}
            {contact.href ? (
              <a 
                href={contact.href} 
                className="hover:underline text-gray-600"
                data-link={contact.href}
                data-link-type={contact.type}
              >
                {contact.displayText}
              </a>
            ) : (
              <span>{contact.displayText}</span>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderSection = (title: string, children: React.ReactNode, icon?: React.ReactNode) => {
    if (!children) return null;
    
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={templateStyles.section}
      >
        <h2 className={templateStyles.sectionTitle}>
          {title}
        </h2>
        {children}
      </motion.section>
    );
  };

  const renderExperience = () => {
    if (!data.experience.length) return null;

    return renderSection(
      'Experience',
      <div className="space-y-4">
        {data.experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-4 border-l-2"
            style={{ borderColor: colors.accent }}
          >
            <div 
              className="absolute w-3 h-3 rounded-full -left-2 top-1"
              style={{ backgroundColor: colors.primary }}
            />
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                <p className="text-gray-700 font-medium">{exp.company}</p>
                {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
              </div>
            </div>
            {exp.description && (
              <p className="text-gray-700 mb-2 leading-relaxed">{exp.description}</p>
            )}
            {exp.achievements && exp.achievements.length > 0 && (
              <ul className="space-y-1">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: colors.primary }} />
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderEducation = () => {
    if (!data.education.length) return null;

    return renderSection(
      'Education',
      <div className="space-y-4">
        {data.education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-4 border-l-2"
            style={{ borderColor: colors.accent }}
          >
            <div 
              className="absolute w-3 h-3 rounded-full -left-2 top-1"
              style={{ backgroundColor: colors.primary }}
            />
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700 font-medium">{edu.school}</p>
                {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                {edu.honors && <p className="text-sm text-gray-600">{edu.honors}</p>}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDateRange(edu.startDate, edu.endDate)}
              </div>
            </div>
            {edu.coursework && edu.coursework.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700 mb-1">Relevant Coursework:</p>
                <div className="flex flex-wrap gap-1">
                  {edu.coursework.map((course, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded"
                      style={{ backgroundColor: colors.accent, color: colors.text }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    const hasSkills = Object.values(data.skills).some(skillArray => skillArray.length > 0);
    if (!hasSkills) return null;

    const skillCategories = [
      { label: 'Technical Skills', skills: data.skills.technical },
      { label: 'Frameworks & Libraries', skills: data.skills.frameworks },
      { label: 'Soft Skills', skills: data.skills.soft },
    ].filter(category => category.skills.length > 0);

    return renderSection(
      'Skills',
      <div className="space-y-3">
        {skillCategories.map((category, categoryIndex) => (
          <div key={category.label}>
            <h4 className={`font-medium text-gray-800 mb-2 ${templateStyles.layout === "compact" ? "text-xs font-mono uppercase" : ""}`}>
              {category.label}
            </h4>
            <div className={templateStyles.layout === "compact" ? "grid grid-cols-3 gap-2" : "flex flex-wrap gap-2"}>
              {category.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`text-sm font-medium ${
                    templateStyles.layout === "compact" 
                      ? "bg-gray-100 text-gray-700 px-2 py-1 rounded font-mono text-xs text-center" 
                      : templateStyles.layout === "traditional"
                      ? "text-gray-700 mr-4"
                      : "px-3 py-1 rounded bg-gray-100 text-gray-700"
                  }`}
                >
                  {templateStyles.layout === "traditional" ? `• ${skill}` : skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderProjects = () => {
    if (!settings.enabledSections.projects || !data.projects.length) return null;

    return renderSection(
      'Projects',
      <div className="space-y-4">
        {data.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-4 border-l-2"
            style={{ borderColor: colors.accent }}
          >
            <div 
              className="absolute w-3 h-3 rounded-full -left-2 top-1"
              style={{ backgroundColor: colors.primary }}
            />
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  {project.link && (
                    <a 
                      href={project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                      className="text-blue-600 hover:text-blue-800"
                      data-link={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                      data-link-type="project"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github.startsWith('http') ? project.github : `https://github.com/${project.github}`} 
                      className="text-gray-600 hover:text-gray-800"
                      data-link={project.github.startsWith('http') ? project.github : `https://github.com/${project.github}`}
                      data-link-type="github"
                    >
                      <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDateRange(project.startDate, project.endDate)}
              </div>
            </div>
            {project.description && (
              <p className="text-gray-700 mb-2 leading-relaxed">{project.description}</p>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: colors.accent, color: colors.text }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderCertifications = () => {
    if (!settings.enabledSections.certifications || !data.certifications.length) return null;

    return renderSection(
      'Certifications',
      <div className="space-y-3">
        {data.certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-start"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                {cert.link && (
                  <a 
                    href={cert.link.startsWith('http') ? cert.link : `https://${cert.link}`} 
                    className="text-blue-600 hover:text-blue-800"
                    data-link={cert.link.startsWith('http') ? cert.link : `https://${cert.link}`}
                    data-link-type="certification"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className="text-gray-700">{cert.issuer}</p>
              {cert.credentialId && (
                <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
              )}
            </div>
            <div className="text-sm text-gray-600 text-right">
              <p>{formatDate(cert.date)}</p>
              {cert.expiryDate && (
                <p className="text-xs">Expires: {formatDate(cert.expiryDate)}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderLanguages = () => {
    if (!settings.enabledSections.languages || !data.languages.length) return null;

    return renderSection(
      'Languages',
      <div className="grid grid-cols-2 gap-3">
        {data.languages.map((lang, index) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center"
          >
            <span className="font-medium text-gray-900">{lang.language}</span>
            <span 
              className="text-sm px-2 py-1 rounded"
              style={{ backgroundColor: colors.accent, color: colors.text }}
            >
              {lang.proficiency}
            </span>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderVolunteer = () => {
    if (!settings.enabledSections.volunteer || !data.volunteer.length) return null;

    return renderSection(
      'Volunteer Experience',
      <div className="space-y-4">
        {data.volunteer.map((vol, index) => (
          <motion.div
            key={vol.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-4 border-l-2"
            style={{ borderColor: colors.accent }}
          >
            <div 
              className="absolute w-3 h-3 rounded-full -left-2 top-1"
              style={{ backgroundColor: colors.primary }}
            />
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                <p className="text-gray-700 font-medium">{vol.organization}</p>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDateRange(vol.startDate, vol.endDate)}
              </div>
            </div>
            {vol.description && (
              <p className="text-gray-700 leading-relaxed">{vol.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full bg-white ${templateStyles.container}`}
      style={{ 
        fontFamily: settings.fontFamily,
        fontSize: `${settings.fontSize}px`,
        lineHeight: 1.4,
        width: '210mm',
        minHeight: '297mm',
        padding: '15mm',
        margin: '0',
        boxSizing: 'border-box'
      }}
      id="resume-content"
    >
      {/* Header */}
      <header className={templateStyles.header}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={templateStyles.headerName}
        >
          {data.personalInfo.name || 'Your Name'}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={templateStyles.headerDetails}
        >
          {renderContactInfo()}
        </motion.div>
      </header>

      {/* Content */}
      <div className="space-y-6">
        {/* Summary */}
        {data.summary && renderSection(
          'Professional Summary',
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-gray-700 leading-relaxed"
          >
            {data.summary}
          </motion.p>
        )}

        {/* Dynamic sections based on settings */}
        {settings.sectionOrder.map((sectionId) => {
          if (!settings.enabledSections[sectionId]) return null;
          
          switch (sectionId) {
            case 'experience':
              return <div key={sectionId}>{renderExperience()}</div>;
            case 'education':
              return <div key={sectionId}>{renderEducation()}</div>;
            case 'skills':
              return <div key={sectionId}>{renderSkills()}</div>;
            case 'projects':
              return <div key={sectionId}>{renderProjects()}</div>;
            case 'certifications':
              return <div key={sectionId}>{renderCertifications()}</div>;
            case 'languages':
              return <div key={sectionId}>{renderLanguages()}</div>;
            case 'volunteer':
              return <div key={sectionId}>{renderVolunteer()}</div>;
            default:
              return null;
          }
        })}
      </div>
    </motion.div>
  );
};