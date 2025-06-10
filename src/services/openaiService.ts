interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface ContentSuggestion {
  bulletPoints: string[];
  skills: string[];
  achievements: string[];
}

interface SkillGapAnalysis {
  missingSkills: string[];
  recommendedCertifications: string[];
  strengthAreas: string[];
  improvementAreas: string[];
  overallScore: number;
}

interface JobMatchingResult {
  matchingScore: number;
  keywordMatches: string[];
  missingKeywords: string[];
  suggestedChanges: {
    summary: string;
    experienceUpdates: Array<{
      experienceId: string;
      suggestedDescription: string;
      suggestedAchievements: string[];
    }>;
    skillsToAdd: string[];
    skillsToEmphasize: string[];
  };
}

class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!this.apiKey) {
      throw new Error('OpenAI API key not found in environment variables');
    }
  }

  private async makeRequest(messages: Array<{ role: string; content: string }>, temperature = 0.7): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenAI API request failed:', error);
      throw error;
    }
  }

  async generateContentSuggestions(
    jobTitle: string,
    industry: string,
    experienceLevel: string,
    currentDescription?: string
  ): Promise<ContentSuggestion> {
    const prompt = `
As a professional resume writer, generate content suggestions for a ${experienceLevel} ${jobTitle} in the ${industry} industry.

${currentDescription ? `Current description: "${currentDescription}"` : ''}

Please provide:
1. 5-7 impactful bullet points for work experience
2. 8-10 relevant technical and soft skills
3. 3-5 quantifiable achievements

Focus on:
- Action verbs and quantifiable results
- Industry-specific keywords
- ATS-friendly language
- Modern professional terminology

Return the response in this exact JSON format:
{
  "bulletPoints": ["bullet point 1", "bullet point 2", ...],
  "skills": ["skill 1", "skill 2", ...],
  "achievements": ["achievement 1", "achievement 2", ...]
}
`;

    const messages = [
      { role: 'system', content: 'You are an expert resume writer and career coach.' },
      { role: 'user', content: prompt }
    ];

    const response = await this.makeRequest(messages);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse content suggestions response:', error);
      throw new Error('Invalid response format from AI service');
    }
  }

  async analyzeSkillGap(
    resumeData: any,
    targetJobTitle: string,
    targetIndustry: string
  ): Promise<SkillGapAnalysis> {
    const resumeText = this.extractResumeText(resumeData);
    
    const prompt = `
Analyze this resume for a ${targetJobTitle} position in the ${targetIndustry} industry:

RESUME DATA:
${resumeText}

TARGET ROLE: ${targetJobTitle} in ${targetIndustry}

Provide a comprehensive skill gap analysis including:
1. Missing skills that are crucial for the target role
2. Recommended certifications to pursue
3. Current strength areas to highlight
4. Areas needing improvement
5. Overall readiness score (0-100)

Return the response in this exact JSON format:
{
  "missingSkills": ["skill 1", "skill 2", ...],
  "recommendedCertifications": ["cert 1", "cert 2", ...],
  "strengthAreas": ["strength 1", "strength 2", ...],
  "improvementAreas": ["area 1", "area 2", ...],
  "overallScore": 85
}
`;

    const messages = [
      { role: 'system', content: 'You are an expert career counselor and technical recruiter.' },
      { role: 'user', content: prompt }
    ];

    const response = await this.makeRequest(messages);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse skill gap analysis response:', error);
      throw new Error('Invalid response format from AI service');
    }
  }

  async matchJobDescription(
    resumeData: any,
    jobDescription: string
  ): Promise<JobMatchingResult> {
    const resumeText = this.extractResumeText(resumeData);
    
    const prompt = `
Analyze how well this resume matches the job description and provide tailoring suggestions:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide:
1. Matching score (0-100)
2. Keywords that already match
3. Important keywords missing from resume
4. Specific suggestions for:
   - Updated professional summary
   - Experience descriptions improvements
   - Skills to add or emphasize

Return the response in this exact JSON format:
{
  "matchingScore": 75,
  "keywordMatches": ["keyword 1", "keyword 2", ...],
  "missingKeywords": ["missing 1", "missing 2", ...],
  "suggestedChanges": {
    "summary": "Updated professional summary text...",
    "experienceUpdates": [
      {
        "experienceId": "exp-1",
        "suggestedDescription": "Updated description...",
        "suggestedAchievements": ["achievement 1", "achievement 2"]
      }
    ],
    "skillsToAdd": ["skill 1", "skill 2", ...],
    "skillsToEmphasize": ["skill 1", "skill 2", ...]
  }
}
`;

    const messages = [
      { role: 'system', content: 'You are an expert ATS optimization specialist and resume writer.' },
      { role: 'user', content: prompt }
    ];

    const response = await this.makeRequest(messages, 0.3); // Lower temperature for more consistent formatting
    
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse job matching response:', error);
      throw new Error('Invalid response format from AI service');
    }
  }

  private extractResumeText(resumeData: any): string {
    const sections = [];
    
    // Personal Info
    if (resumeData.personalInfo) {
      sections.push(`Name: ${resumeData.personalInfo.name}`);
      sections.push(`Email: ${resumeData.personalInfo.email}`);
      sections.push(`Location: ${resumeData.personalInfo.location}`);
    }
    
    // Summary
    if (resumeData.summary) {
      sections.push(`\nSUMMARY:\n${resumeData.summary}`);
    }
    
    // Experience
    if (resumeData.experience?.length > 0) {
      sections.push('\nEXPERIENCE:');
      resumeData.experience.forEach((exp: any, index: number) => {
        sections.push(`${index + 1}. ${exp.jobTitle} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})`);
        if (exp.description) sections.push(`   Description: ${exp.description}`);
        if (exp.achievements?.length > 0) {
          sections.push(`   Achievements: ${exp.achievements.join('; ')}`);
        }
      });
    }
    
    // Education
    if (resumeData.education?.length > 0) {
      sections.push('\nEDUCATION:');
      resumeData.education.forEach((edu: any) => {
        sections.push(`${edu.degree} from ${edu.school} (${edu.startDate} - ${edu.endDate})`);
      });
    }
    
    // Skills
    if (resumeData.skills) {
      const allSkills = [
        ...(resumeData.skills.technical || []),
        ...(resumeData.skills.soft || []),
        ...(resumeData.skills.languages || []),
        ...(resumeData.skills.frameworks || [])
      ];
      if (allSkills.length > 0) {
        sections.push(`\nSKILLS: ${allSkills.join(', ')}`);
      }
    }
    
    // Projects
    if (resumeData.projects?.length > 0) {
      sections.push('\nPROJECTS:');
      resumeData.projects.forEach((project: any) => {
        sections.push(`${project.name}: ${project.description}`);
        if (project.technologies?.length > 0) {
          sections.push(`   Technologies: ${project.technologies.join(', ')}`);
        }
      });
    }
    
    return sections.join('\n');
  }
}

export const openaiService = new OpenAIService();
export type { ContentSuggestion, SkillGapAnalysis, JobMatchingResult }; 