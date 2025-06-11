import { openaiService } from './openaiService';
import type { Resume } from '../types/resume';
import * as pdfjs from 'pdfjs-dist';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface OpenAIResumeParseResponse {
  profile: {
    name: string;
    email: string;
    phone: string;
    location: string;
    url: string;
    summary: string;
  };
  workExperiences: Array<{
    company: string;
    jobTitle: string;
    date: string;
    descriptions: string[];
  }>;
  educations: Array<{
    school: string;
    degree: string;
    date: string;
    gpa: string;
    descriptions: string[];
  }>;
  skills: {
    featuredSkills: Array<{ skill: string; rating: number }>;
    descriptions: string[];
  };
  projects: Array<{
    project: string;
    date: string;
    descriptions: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    expiryDate: string;
    credentialId: string;
  }>;
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  volunteers: Array<{
    organization: string;
    role: string;
    date: string;
    descriptions: string[];
  }>;
  awards: Array<{
    title: string;
    issuer: string;
    date: string;
    description: string;
  }>;
}

class OpenAIResumeParser {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!this.apiKey) {
      throw new Error('OpenAI API key not found in environment variables');
    }
  }

  /**
   * Extract text content from PDF file
   */
  private async extractTextFromPdf(fileUrl: string): Promise<string> {
    try {
      const pdfFile = await pdfjs.getDocument(fileUrl).promise;
      let fullText = '';

      for (let i = 1; i <= pdfFile.numPages; i++) {
        const page = await pdfFile.getPage(i);
        const textContent = await page.getTextContent();
        
        // Extract text items and join them
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        
        fullText += pageText + '\n';
      }

      return fullText.trim();
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF. Please ensure the PDF is readable.');
    }
  }

  /**
   * Parse resume text using OpenAI
   */
  private async parseResumeWithAI(resumeText: string): Promise<OpenAIResumeParseResponse> {
    const prompt = `
You are an expert resume parser. Extract and structure the following resume text into a comprehensive JSON format.

RESUME TEXT:
${resumeText}

Please extract ALL available information and structure it into the following JSON format. If a section is not present or information is not available, use empty arrays or empty strings as appropriate:

{
  "profile": {
    "name": "Full name of the person",
    "email": "Email address",
    "phone": "Phone number",
    "location": "City, State or full address",
    "url": "Website, portfolio, or LinkedIn URL",
    "summary": "Professional summary or objective statement"
  },
  "workExperiences": [
    {
      "company": "Company name",
      "jobTitle": "Job title/position",
      "date": "Employment dates (e.g., 'Jan 2020 - Present' or '2020-2022')",
      "descriptions": ["Bullet point 1", "Bullet point 2", "Achievement or responsibility"]
    }
  ],
  "educations": [
    {
      "school": "Institution name",
      "degree": "Degree type and field of study",
      "date": "Graduation date or date range",
      "gpa": "GPA if mentioned",
      "descriptions": ["Relevant coursework", "Honors", "Activities"]
    }
  ],
  "skills": {
    "featuredSkills": [],
    "descriptions": ["Skill 1", "Skill 2", "Programming language", "Tool", "Technology"]
  },
  "projects": [
    {
      "project": "Project name",
      "date": "Project date or date range",
      "descriptions": ["Project description", "Technologies used", "Key achievements"]
    }
  ],
  "certifications": [
    {
      "name": "Certification name",
      "issuer": "Issuing organization",
      "date": "Date obtained",
      "expiryDate": "Expiry date if mentioned",
      "credentialId": "Credential ID if mentioned"
    }
  ],
  "languages": [
    {
      "language": "Language name",
      "proficiency": "Proficiency level (e.g., Native, Fluent, Intermediate, Basic)"
    }
  ],
  "volunteers": [
    {
      "organization": "Organization name",
      "role": "Volunteer role/position",
      "date": "Date range of volunteer work",
      "descriptions": ["Description of volunteer work", "Achievements"]
    }
  ],
  "awards": [
    {
      "title": "Award or honor title",
      "issuer": "Issuing organization",
      "date": "Date received",
      "description": "Description of the award"
    }
  ]
}

IMPORTANT INSTRUCTIONS:
1. Extract ALL information present in the resume, even if it seems minor
2. For work experience, include ALL job positions mentioned
3. For education, include ALL degrees, certifications, and educational experiences
4. For skills, extract both technical and soft skills mentioned anywhere in the resume
5. Look for projects in dedicated sections or mentioned within work experience
6. Extract contact information carefully (email, phone, location, websites)
7. If dates are in various formats, standardize them but keep the original meaning
8. For descriptions, break down long paragraphs into individual bullet points
9. If information is unclear or ambiguous, make reasonable inferences based on context
10. Ensure the JSON is valid and properly formatted
11. Do not add information that is not present in the resume text

Return ONLY the JSON object, no additional text or explanation.
`;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are an expert resume parser. Always respond with valid JSON only.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.1, // Low temperature for consistent parsing
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || '';
      
      // Clean and parse the JSON response
      const cleanedResponse = aiResponse.trim();
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : cleanedResponse;
      
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing resume with AI:', error);
      throw new Error('Failed to parse resume with AI. Please try again.');
    }
  }

  /**
   * Convert OpenAI response to Resume type
   */
  private convertToResumeType(aiResponse: OpenAIResumeParseResponse): Resume {
    return {
      profile: {
        name: aiResponse.profile.name || '',
        email: aiResponse.profile.email || '',
        phone: aiResponse.profile.phone || '',
        url: aiResponse.profile.url || '',
        summary: aiResponse.profile.summary || '',
        location: aiResponse.profile.location || ''
      },
      workExperiences: aiResponse.workExperiences.map(exp => ({
        company: exp.company || '',
        jobTitle: exp.jobTitle || '',
        date: exp.date || '',
        descriptions: exp.descriptions || []
      })),
      educations: aiResponse.educations.map(edu => ({
        school: edu.school || '',
        degree: edu.degree || '',
        date: edu.date || '',
        gpa: edu.gpa || '',
        descriptions: edu.descriptions || []
      })),
      projects: aiResponse.projects.map(proj => ({
        project: proj.project || '',
        date: proj.date || '',
        descriptions: proj.descriptions || []
      })),
      skills: {
        featuredSkills: aiResponse.skills.featuredSkills || [],
        descriptions: aiResponse.skills.descriptions || []
      },
      awards: aiResponse.awards.map(award => ({
        title: award.title || '',
        issuer: award.issuer || '',
        date: award.date || '',
        description: award.description || ''
      })),
      volunteers: aiResponse.volunteers.map(vol => ({
        organization: vol.organization || '',
        role: vol.role || '',
        date: vol.date || '',
        descriptions: vol.descriptions || []
      })),
      certifications: aiResponse.certifications.map(cert => ({
        name: cert.name || '',
        issuer: cert.issuer || '',
        date: cert.date || '',
        expiryDate: cert.expiryDate || '',
        credentialId: cert.credentialId || ''
      })),
      languages: aiResponse.languages.map(lang => ({
        language: lang.language || '',
        proficiency: lang.proficiency || ''
      })),
      custom: {
        descriptions: []
      }
    };
  }

  /**
   * Main method to parse resume from PDF using OpenAI
   */
  async parseResumeFromPdf(fileUrl: string): Promise<Resume> {
    try {
      console.log('Starting OpenAI-based resume parsing...');
      
      // Step 1: Extract text from PDF
      console.log('Extracting text from PDF...');
      const resumeText = await this.extractTextFromPdf(fileUrl);
      
      if (!resumeText.trim()) {
        throw new Error('No text could be extracted from the PDF. Please ensure the PDF contains readable text.');
      }

      console.log('Extracted text length:', resumeText.length);
      
      // Step 2: Parse with OpenAI
      console.log('Parsing resume with OpenAI...');
      const aiResponse = await this.parseResumeWithAI(resumeText);
      
      // Step 3: Convert to Resume type
      console.log('Converting to Resume format...');
      const resume = this.convertToResumeType(aiResponse);
      
      console.log('Resume parsing completed successfully!');
      return resume;
      
    } catch (error) {
      console.error('Error in OpenAI resume parsing:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const openaiResumeParser = new OpenAIResumeParser();

// Export the main parsing function for backward compatibility
export const parseResumeFromPdf = (fileUrl: string): Promise<Resume> => {
  return openaiResumeParser.parseResumeFromPdf(fileUrl);
}; 