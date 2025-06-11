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
You are an expert ATS optimization specialist and resume writer. Analyze how well this resume matches the job description and provide comprehensive tailoring suggestions.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Please provide a detailed analysis including:

1. MATCHING SCORE (0-100): Calculate based on:
   - Skills alignment (40%)
   - Experience relevance (30%)
   - Keyword presence (20%)
   - Education/qualifications match (10%)

2. KEYWORD ANALYSIS:
   - Keywords that already match between resume and job description
   - Important keywords missing from resume (focus on technical skills, tools, methodologies, certifications)

3. OPTIMIZATION SUGGESTIONS:
   - Updated professional summary that incorporates job-specific keywords and requirements
   - Specific improvements for each experience entry with job-relevant language
   - Skills to add (technical and soft skills mentioned in job description)
   - Skills to emphasize (existing skills that match job requirements)

Focus on:
- ATS-friendly keywords and phrases
- Quantifiable achievements and metrics
- Industry-specific terminology
- Action verbs that match the job requirements
- Technical skills and tools mentioned in the job posting
- Soft skills and competencies required
- Certifications and qualifications needed

Return the response in this exact JSON format (ensure valid JSON):
{
  "matchingScore": 75,
  "keywordMatches": ["React", "JavaScript", "Team Leadership", "Agile", "Problem Solving"],
  "missingKeywords": ["TypeScript", "AWS", "Docker", "CI/CD", "Scrum Master"],
  "suggestedChanges": {
    "summary": "Results-driven Software Engineer with 5+ years of experience in React, JavaScript, and team leadership. Proven track record of delivering scalable web applications using Agile methodologies. Expertise in problem-solving and cross-functional collaboration, with strong background in modern development practices and cloud technologies.",
    "experienceUpdates": [
      {
        "experienceId": "exp-1",
        "suggestedDescription": "Led development of responsive web applications using React and JavaScript, collaborating with cross-functional teams in Agile environment. Implemented CI/CD pipelines and deployed applications to AWS cloud infrastructure.",
        "suggestedAchievements": [
          "Increased application performance by 40% through code optimization and implementation of best practices",
          "Mentored 3 junior developers and conducted code reviews to ensure quality standards",
          "Successfully delivered 15+ projects on time using Scrum methodology"
        ]
      }
    ],
    "skillsToAdd": ["TypeScript", "AWS", "Docker", "CI/CD", "Scrum"],
    "skillsToEmphasize": ["React", "JavaScript", "Team Leadership", "Agile"]
  }
}

Important: Ensure the response is valid JSON. Do not include any text before or after the JSON object.
`;

    const messages = [
      { role: 'system', content: 'You are an expert ATS optimization specialist and resume writer. Always respond with valid JSON only.' },
      { role: 'user', content: prompt }
    ];

    const response = await this.makeRequest(messages, 0.3); // Lower temperature for more consistent formatting
    
    try {
      // Clean the response to ensure it's valid JSON
      const cleanedResponse = response.trim();
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : cleanedResponse;
      
      const result = JSON.parse(jsonString);
      
      // Validate the result structure
      if (!result.matchingScore || !result.keywordMatches || !result.missingKeywords || !result.suggestedChanges) {
        throw new Error('Invalid response structure from AI service');
      }
      
      // Ensure arrays exist
      result.keywordMatches = result.keywordMatches || [];
      result.missingKeywords = result.missingKeywords || [];
      result.suggestedChanges.skillsToAdd = result.suggestedChanges.skillsToAdd || [];
      result.suggestedChanges.skillsToEmphasize = result.suggestedChanges.skillsToEmphasize || [];
      result.suggestedChanges.experienceUpdates = result.suggestedChanges.experienceUpdates || [];
      
      // Ensure matching score is within valid range
      result.matchingScore = Math.max(0, Math.min(100, result.matchingScore));
      
      return result;
    } catch (error) {
      console.error('Failed to parse job matching response:', error);
      console.error('Raw response:', response);
      
      // Return a fallback response with basic analysis
      return {
        matchingScore: 50,
        keywordMatches: [],
        missingKeywords: ['Please try again - AI analysis failed'],
        suggestedChanges: {
          summary: 'Unable to generate optimized summary. Please try the analysis again.',
          experienceUpdates: [],
          skillsToAdd: [],
          skillsToEmphasize: []
        }
      };
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
    
    // Certifications
    if (resumeData.certifications?.length > 0) {
      sections.push('\nCERTIFICATIONS:');
      resumeData.certifications.forEach((cert: any) => {
        sections.push(`${cert.name} - ${cert.issuer} (${cert.date})`);
      });
    }
    
    // Languages
    if (resumeData.languages?.length > 0) {
      sections.push('\nLANGUAGES:');
      resumeData.languages.forEach((lang: any) => {
        sections.push(`${lang.language} (${lang.proficiency})`);
      });
    }
    
    // Volunteer Experience
    if (resumeData.volunteer?.length > 0) {
      sections.push('\nVOLUNTEER EXPERIENCE:');
      resumeData.volunteer.forEach((vol: any) => {
        sections.push(`${vol.role} at ${vol.organization} (${vol.startDate} - ${vol.endDate})`);
        if (vol.description) sections.push(`   Description: ${vol.description}`);
      });
    }
    
    // Awards
    if (resumeData.awards?.length > 0) {
      sections.push('\nAWARDS AND HONORS:');
      resumeData.awards.forEach((award: any) => {
        sections.push(`${award.title} - ${award.issuer} (${award.date})`);
        if (award.description) sections.push(`   Description: ${award.description}`);
      });
    }
    
    return sections.join('\n');
  }
}

export const openaiService = new OpenAIService();
export type { ContentSuggestion, SkillGapAnalysis, JobMatchingResult }; 