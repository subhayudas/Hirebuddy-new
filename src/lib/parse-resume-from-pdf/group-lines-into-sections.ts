import type { Lines, ResumeSectionToLines } from "../../types/resume";

/**
 * Step 3: Group lines into sections
 *
 * This identifies section headers and groups the following lines under each section.
 */
export const groupLinesIntoSections = (lines: Lines): ResumeSectionToLines => {
  const sections: ResumeSectionToLines = {};
  
  // Common section headers (case insensitive)
  const sectionHeaders = [
    'experience',
    'work experience',
    'professional experience',
    'employment',
    'employment history',
    'education',
    'academic background',
    'qualifications',
    'skills',
    'technical skills',
    'core competencies',
    'projects',
    'personal projects',
    'key projects',
    'summary',
    'professional summary',
    'profile',
    'objective',
    'career objective',
    'about',
    'about me',
    'contact',
    'contact information',
    'certifications',
    'certificates',
    'awards',
    'achievements',
    'honors',
    'languages',
    'interests',
    'hobbies',
    'volunteer',
    'volunteer experience',
    'publications',
    'references'
  ];
  
  let currentSection = 'profile'; // Default section for content at the top
  sections[currentSection] = [];
  
  for (const line of lines) {
    const lineText = line.text.toLowerCase().trim();
    
    // Check if this line is a section header
    const matchedHeader = sectionHeaders.find(header => {
      // Exact match or line starts with the header
      return lineText === header || 
             lineText.startsWith(header + ':') ||
             lineText.startsWith(header + ' ') ||
             (lineText.length <= header.length + 3 && lineText.includes(header));
    });
    
    if (matchedHeader) {
      // Start a new section
      currentSection = matchedHeader.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      if (!sections[currentSection]) {
        sections[currentSection] = [];
      }
    } else {
      // Add line to current section
      if (!sections[currentSection]) {
        sections[currentSection] = [];
      }
      sections[currentSection].push(line);
    }
  }
  
  // Clean up empty sections
  Object.keys(sections).forEach(key => {
    if (sections[key].length === 0) {
      delete sections[key];
    }
  });
  
  return sections;
}; 