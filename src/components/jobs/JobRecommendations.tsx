import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  MapPin, 
  Clock, 
  Briefcase,
  ExternalLink,
  Bookmark,
  RefreshCw,
  Star,
  Zap
} from "lucide-react";
import { Job } from "@/types/job";
import { toast } from "sonner";

interface JobRecommendationsProps {
  savedJobs: Set<string>;
  onSaveJob: (jobId: string) => void;
  onApplyJob: (job: Job) => void;
  onJobClick: (job: Job) => void;
}

export const JobRecommendations = ({ 
  savedJobs, 
  onSaveJob, 
  onApplyJob, 
  onJobClick 
}: JobRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Mock recommendations data - in a real app, this would come from an AI service
  const mockRecommendations: Job[] = [
    {
      id: "rec-1",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      description: "Join our innovative team building next-generation web applications with React, TypeScript, and modern frameworks.",
      isRemote: true,
      isProbablyRemote: true,
      createdAt: new Date().toISOString(),
      posted: "2 days ago",
      logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=60&h=60&fit=crop&crop=center",
      tags: ["React", "TypeScript", "Remote", "Senior Level"],
      type: "Full-time",
      applyLink: "https://example.com/apply/1"
    },
    {
      id: "rec-2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "New York, NY",
      description: "Build scalable applications using modern technologies. Experience with React, Node.js, and cloud platforms required.",
      isRemote: false,
      isProbablyRemote: false,
      createdAt: new Date().toISOString(),
      posted: "1 day ago",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center",
      tags: ["JavaScript", "Node.js", "Full Stack", "Mid Level"],
      type: "Full-time",
      applyLink: "https://example.com/apply/2"
    },
    {
      id: "rec-3",
      title: "React Developer",
      company: "InnovateLabs",
      location: "Remote",
      description: "Work on cutting-edge projects with a passionate team. Strong React and modern JavaScript skills essential.",
      isRemote: true,
      isProbablyRemote: true,
      createdAt: new Date().toISOString(),
      posted: "3 days ago",
      logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=60&h=60&fit=crop&crop=center",
      tags: ["React", "JavaScript", "Remote", "Mid Level"],
      type: "Full-time",
      applyLink: "https://example.com/apply/3"
    }
  ];

  useEffect(() => {
    // Simulate loading recommendations
    setIsLoading(true);
    const timer = setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [refreshKey]);

  const refreshRecommendations = () => {
    setRefreshKey(prev => prev + 1);
    toast.info("Refreshing recommendations...");
  };

  const getMatchScore = (job: Job): number => {
    // Mock match score calculation based on tags and other factors
    let score = Math.floor(Math.random() * 30) + 70; // 70-100%
    if (job.isRemote) score += 5;
    if (job.tags.includes("React")) score += 5;
    return Math.min(score, 100);
  };

  const getMatchReason = (job: Job): string => {
    const reasons = [
      "Matches your React experience",
      "Similar to your saved jobs",
      "High salary potential",
      "Great company culture",
      "Remote work available",
      "Growing company",
      "Matches your skill set"
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-purple-900">AI Recommendations</CardTitle>
              <p className="text-sm text-purple-600">Jobs picked just for you</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshRecommendations}
            disabled={isLoading}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white/60 rounded-lg p-4 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {recommendations.map((job, index) => {
              const matchScore = getMatchScore(job);
              const matchReason = getMatchReason(job);
              
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/50 cursor-pointer group hover:shadow-md transition-all duration-200"
                  onClick={() => onJobClick(job)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10 border-2 border-white">
                        <AvatarImage src={job.logo} alt={job.company} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-sm">
                          {job.company.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {job.isRemote && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-purple-600 transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-xs text-gray-600">{job.company}</p>
                          
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{job.posted}</span>
                            </div>
                          </div>

                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {job.description}
                          </p>

                          {/* Match Score */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3 text-green-600" />
                              <span className="text-xs font-medium text-green-600">
                                {matchScore}% match
                              </span>
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-xs text-gray-500">{matchReason}</span>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {job.tags.slice(0, 3).map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs px-2 py-0 h-5">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSaveJob(job.id);
                            }}
                            className={`h-6 w-6 p-0 ${savedJobs.has(job.id) ? 'text-purple-600' : 'text-gray-400 hover:text-purple-600'}`}
                          >
                            <Bookmark className={`w-3 h-3 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onApplyJob(job);
                            }}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-green-600"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {!isLoading && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-2"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={refreshRecommendations}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              <Zap className="w-4 h-4 mr-2" />
              Get More Recommendations
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}; 