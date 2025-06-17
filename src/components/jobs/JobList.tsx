import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Bookmark, 
  Heart, 
  ExternalLink, 
  Building,
  Star,
  TrendingUp,
  Zap,
  ChevronDown,
  Briefcase,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Job } from "@/types/job";

interface JobListProps {
  jobs: Job[];
  isLoading?: boolean;
  searchQuery?: string;
  onJobClick?: (job: Job) => void;
}

export const JobList = ({ jobs, isLoading = false, searchQuery, onJobClick }: JobListProps) => {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [likedJobs, setLikedJobs] = useState<Set<string>>(new Set());
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);

  const toggleSave = (jobId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
    } else {
      newSaved.add(jobId);
    }
    setSavedJobs(newSaved);
  };

  const toggleLike = (jobId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newLiked = new Set(likedJobs);
    if (newLiked.has(jobId)) {
      newLiked.delete(jobId);
    } else {
      newLiked.add(jobId);
    }
    setLikedJobs(newLiked);
  };
  
  const handleJobClick = (job: Job) => {
    if (onJobClick) {
      onJobClick(job);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-600">
          {searchQuery 
            ? `No jobs match your search for "${searchQuery}"`
            : "No jobs are available at the moment. Check back later!"
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center"
      >
        <div>
          <motion.h2 
            className="text-2xl font-bold text-gray-900 relative inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
            <motion.div 
              className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </motion.h2>
          {searchQuery && (
            <motion.p 
              className="text-gray-600 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Results for "{searchQuery}"
            </motion.p>
          )}
        </div>
        
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span className="text-sm text-gray-500">Sort by:</span>
          <Select defaultValue="relevant">
            <SelectTrigger className="w-[180px] bg-white/90 backdrop-blur-sm border-gray-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevant">Most Relevant</SelectItem>
              <SelectItem value="date">Date Posted</SelectItem>
              <SelectItem value="salary">Salary: High to Low</SelectItem>
              <SelectItem value="company">Company A-Z</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </motion.div>

      {/* Job Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleJobClick(job)}
              onMouseEnter={() => setHoveredJob(job.id)}
              onMouseLeave={() => setHoveredJob(null)}
            >
              <Card 
                className={`group cursor-pointer transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden ${
                  hoveredJob === job.id ? 'shadow-xl transform -translate-y-1' : 'shadow-md'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {job.isRemote && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </motion.div>

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 font-medium">{job.company}</p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-4">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`p-2 h-8 w-8 transition-all ${
                                    likedJobs.has(job.id) 
                                      ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                  }`}
                                  onClick={(e) => toggleLike(job.id, e)}
                                >
                                  <Heart className={`w-4 h-4 ${likedJobs.has(job.id) ? 'fill-current' : ''}`} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{likedJobs.has(job.id) ? 'Unlike' : 'Like'} this job</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`p-2 h-8 w-8 transition-all ${
                                    savedJobs.has(job.id) 
                                      ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                                      : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                                  }`}
                                  onClick={(e) => toggleSave(job.id, e)}
                                >
                                  <Bookmark className={`w-4 h-4 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{savedJobs.has(job.id) ? 'Unsave' : 'Save'} this job</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      {/* Job Meta Information */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{job.posted}</span>
                        </div>
                      </div>

                      {/* Job Description */}
                      <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                        {job.description}
                      </p>

                      {/* Tags */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {job.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex} 
                              variant="secondary" 
                              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {job.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-1">
                              +{job.tags.length - 3} more
                            </Badge>
                          )}
                        </div>

                        {/* Apply Button */}
                        <Button
                          size="sm"
                          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (job.applyLink) {
                              window.open(job.applyLink, '_blank');
                            }
                          }}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
