import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileSearch, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Loader2,
  Copy,
  Check,
  Plus,
  Lightbulb
} from "lucide-react";
import { openaiService, JobMatchingResult } from "@/services/openaiService";
import { toast } from "sonner";

interface JobDescriptionMatcherProps {
  resumeData: any;
  onApplyChanges: (changes: JobMatchingResult['suggestedChanges']) => void;
}

export const JobDescriptionMatcher: React.FC<JobDescriptionMatcherProps> = ({
  resumeData,
  onApplyChanges
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [matchingResult, setMatchingResult] = useState<JobMatchingResult | null>(null);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const analyzeJobMatch = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description");
      return;
    }

    if (!resumeData.personalInfo?.name && !resumeData.summary && resumeData.experience?.length === 0) {
      toast.error("Please add some resume content before analyzing job match");
      return;
    }

    setIsLoading(true);
    try {
      const result = await openaiService.matchJobDescription(resumeData, jobDescription);
      setMatchingResult(result);
      toast.success("Job matching analysis completed!");
    } catch (error) {
      console.error('Error analyzing job match:', error);
      toast.error("Failed to analyze job match. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, id]));
      toast.success("Copied to clipboard!");
      
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const applyAllChanges = () => {
    if (matchingResult) {
      onApplyChanges(matchingResult.suggestedChanges);
      toast.success("All suggested changes applied to your resume!");
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMatchScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-green-600" />
          Job Description Matcher
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Paste a job description to get tailored resume optimization suggestions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Description Input */}
        <div className="space-y-2">
          <Label htmlFor="jobDescription">Job Description *</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the complete job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[200px]"
          />
          <p className="text-xs text-muted-foreground">
            Include the full job posting for best results (requirements, responsibilities, qualifications)
          </p>
        </div>

        <Button 
          onClick={analyzeJobMatch} 
          disabled={isLoading || !jobDescription.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Job Match...
            </>
          ) : (
            <>
              <FileSearch className="w-4 h-4 mr-2" />
              Analyze Job Match
            </>
          )}
        </Button>

        {/* Matching Results */}
        {matchingResult && (
          <div className="space-y-6">
            <Separator />
            
            {/* Match Score */}
            <div className={`p-4 rounded-lg ${getMatchScoreBackground(matchingResult.matchingScore)}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Job Match Score</h3>
                <span className={`text-2xl font-bold ${getMatchScoreColor(matchingResult.matchingScore)}`}>
                  {matchingResult.matchingScore}%
                </span>
              </div>
              <Progress value={matchingResult.matchingScore} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {matchingResult.matchingScore >= 80 
                  ? "Excellent match! Your resume aligns well with this job."
                  : matchingResult.matchingScore >= 60
                  ? "Good match with room for improvement."
                  : "Significant optimization needed to match this job."
                }
              </p>
            </div>

            <div className="flex justify-end">
              <Button onClick={applyAllChanges} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Apply All Suggestions
              </Button>
            </div>

            <Tabs defaultValue="keywords" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              {/* Keywords Tab */}
              <TabsContent value="keywords" className="space-y-4">
                {/* Matching Keywords */}
                {matchingResult.keywordMatches.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium">Keywords You Already Have</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchingResult.keywordMatches.map((keyword, index) => (
                        <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Keywords */}
                {matchingResult.missingKeywords.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h4 className="font-medium">Missing Important Keywords</h4>
                    </div>
                    <Alert>
                      <AlertDescription>
                        These keywords appear frequently in the job description but are missing from your resume.
                      </AlertDescription>
                    </Alert>
                    <div className="flex flex-wrap gap-2">
                      {matchingResult.missingKeywords.map((keyword, index) => (
                        <Badge 
                          key={index} 
                          variant="destructive" 
                          className="bg-red-100 text-red-800 cursor-pointer hover:bg-red-200"
                          onClick={() => copyToClipboard(keyword, `missing-${index}`)}
                        >
                          {keyword}
                          {copiedItems.has(`missing-${index}`) ? (
                            <Check className="w-3 h-3 ml-1" />
                          ) : (
                            <Copy className="w-3 h-3 ml-1" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Summary Tab */}
              <TabsContent value="summary" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium">Optimized Professional Summary</h4>
                  </div>
                  <Alert>
                    <AlertDescription>
                      This AI-generated summary is tailored to match the job requirements.
                    </AlertDescription>
                  </Alert>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-blue-900 flex-1">
                        {matchingResult.suggestedChanges.summary}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(matchingResult.suggestedChanges.summary, 'summary')}
                        className="h-6 w-6 p-0"
                      >
                        {copiedItems.has('summary') ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <h4 className="font-medium">Experience Optimization</h4>
                  </div>
                  <Alert>
                    <AlertDescription>
                      Updated descriptions and achievements tailored to the job requirements.
                    </AlertDescription>
                  </Alert>
                  <ScrollArea className="h-64 w-full">
                    <div className="space-y-4">
                      {matchingResult.suggestedChanges.experienceUpdates.map((update, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-3">
                          <h5 className="font-medium text-sm">Experience #{index + 1}</h5>
                          
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Suggested Description:</Label>
                            <div className="p-2 bg-gray-50 rounded text-sm">
                              <div className="flex items-start justify-between gap-2">
                                <p className="flex-1">{update.suggestedDescription}</p>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(update.suggestedDescription, `exp-desc-${index}`)}
                                  className="h-6 w-6 p-0"
                                >
                                  {copiedItems.has(`exp-desc-${index}`) ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>

                          {update.suggestedAchievements.length > 0 && (
                            <div className="space-y-2">
                              <Label className="text-xs text-muted-foreground">Suggested Achievements:</Label>
                              <div className="space-y-1">
                                {update.suggestedAchievements.map((achievement, achIndex) => (
                                  <div key={achIndex} className="p-2 bg-gray-50 rounded text-sm">
                                    <div className="flex items-start justify-between gap-2">
                                      <p className="flex-1">• {achievement}</p>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(achievement, `exp-ach-${index}-${achIndex}`)}
                                        className="h-6 w-6 p-0"
                                      >
                                        {copiedItems.has(`exp-ach-${index}-${achIndex}`) ? (
                                          <Check className="w-3 h-3 text-green-600" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-4">
                {/* Skills to Add */}
                {matchingResult.suggestedChanges.skillsToAdd.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Plus className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium">Skills to Add</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchingResult.suggestedChanges.skillsToAdd.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="border-green-300 text-green-700 cursor-pointer hover:bg-green-50"
                          onClick={() => copyToClipboard(skill, `add-skill-${index}`)}
                        >
                          {skill}
                          {copiedItems.has(`add-skill-${index}`) ? (
                            <Check className="w-3 h-3 ml-1" />
                          ) : (
                            <Copy className="w-3 h-3 ml-1" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills to Emphasize */}
                {matchingResult.suggestedChanges.skillsToEmphasize.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium">Skills to Emphasize</h4>
                    </div>
                    <Alert>
                      <AlertDescription>
                        These skills from your resume should be highlighted more prominently.
                      </AlertDescription>
                    </Alert>
                    <div className="flex flex-wrap gap-2">
                      {matchingResult.suggestedChanges.skillsToEmphasize.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="border-blue-300 text-blue-700 cursor-pointer hover:bg-blue-50"
                          onClick={() => copyToClipboard(skill, `emphasize-skill-${index}`)}
                        >
                          {skill}
                          {copiedItems.has(`emphasize-skill-${index}`) ? (
                            <Check className="w-3 h-3 ml-1" />
                          ) : (
                            <Copy className="w-3 h-3 ml-1" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 