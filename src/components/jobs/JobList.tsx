
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobFilters } from "@/pages/Jobs";
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
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobListProps {
  searchQuery: string;
  filters: JobFilters;
}

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    posted: "2 days ago",
    description: "We're looking for a skilled Frontend Developer to join our dynamic team...",
    tags: ["React", "TypeScript", "Next.js"],
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=60&h=60&fit=crop&crop=center",
    featured: true,
    remote: true,
    urgent: false
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLab",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $150k",
    posted: "1 day ago",
    description: "Lead product strategy and development for our AI-powered solutions...",
    tags: ["Product Strategy", "Agile", "Analytics"],
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center",
    featured: false,
    remote: true,
    urgent: true
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Contract",
    salary: "$80k - $120k",
    posted: "3 days ago",
    description: "Create beautiful and intuitive user experiences for our mobile apps...",
    tags: ["Figma", "Prototyping", "User Research"],
    logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=60&h=60&fit=crop&crop=center",
    featured: true,
    remote: false,
    urgent: false
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "AI Innovations",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$130k - $200k",
    posted: "5 days ago",
    description: "Analyze complex datasets and build machine learning models...",
    tags: ["Python", "Machine Learning", "SQL"],
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=60&h=60&fit=crop&crop=center",
    featured: false,
    remote: true,
    urgent: false
  }
];

export const JobList = ({ searchQuery, filters }: JobListProps) => {
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const [likedJobs, setLikedJobs] = useState<Set<number>>(new Set());
  const [hoveredJob, setHoveredJob] = useState<number | null>(null);
  const [visibleJobs, setVisibleJobs] = useState<number>(0);
  
  // Animation for staggered job card appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleJobs(mockJobs.length);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleSave = (jobId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
    } else {
      newSaved.add(jobId);
    }
    setSavedJobs(newSaved);
  };

  const toggleLike = (jobId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newLiked = new Set(likedJobs);
    if (newLiked.has(jobId)) {
      newLiked.delete(jobId);
    } else {
      newLiked.add(jobId);
    }
    setLikedJobs(newLiked);
  };
  
  const handleJobClick = (jobId: number) => {
    console.log(`Viewing details for job ${jobId}`);
    // This would navigate to job details page in a real app
  };

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
            {mockJobs.length} Jobs Found
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
          {mockJobs.slice(0, visibleJobs).map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleJobClick(job.id)}
              onMouseEnter={() => setHoveredJob(job.id)}
              onMouseLeave={() => setHoveredJob(null)}
            >
              <Card 
                className={`group cursor-pointer transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden ${hoveredJob === job.id ? 'shadow-xl transform -translate-y-1' : 'shadow-md'} ${
                  job.featured ? 'ring-2 ring-blue-200 ring-opacity-50' : ''
                }`}
              >
                <CardContent className="p-6 relative">
                  {job.featured && (
                    <motion.div 
                      className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    />
                  )}
                  
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {/* Company Logo */}
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <img 
                          src={job.logo} 
                          alt={job.company}
                          className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100 shadow-sm"
                        />
                        {job.featured && (
                          <motion.div 
                            className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, delay: 0.3 + index * 0.1 }}
                          >
                            <Star className="w-3 h-3 text-white fill-current" />
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <motion.h3 
                              className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors"
                              whileHover={{ x: 3 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {job.title}
                            </motion.h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Building className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 font-medium">{job.company}</span>
                              {job.urgent && (
                                <motion.div
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                  <Badge variant="destructive" className="text-xs flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    Urgent
                                  </Badge>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                            {job.remote && (
                              <Badge variant="secondary" className="ml-2 text-xs">Remote</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {job.posted}
                          </div>
                        </div>

                        <motion.p 
                          className="text-gray-600 mb-4"
                          initial={{ height: "3rem" }}
                          animate={{ height: hoveredJob === job.id ? "auto" : "3rem" }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: "hidden" }}
                        >
                          {job.description}
                        </motion.p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag, tagIndex) => (
                              <motion.div
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 + tagIndex * 0.05 }}
                                whileHover={{ y: -2, scale: 1.05 }}
                              >
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {tag}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 ml-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => toggleSave(job.id, e)}
                                className={`${savedJobs.has(job.id) ? 'text-blue-600 bg-blue-50' : 'text-gray-400'} hover:bg-blue-50 hover:text-blue-600`}
                              >
                                <Bookmark className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{savedJobs.has(job.id) ? 'Remove from saved' : 'Save job'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => toggleLike(job.id, e)}
                                className={`${likedJobs.has(job.id) ? 'text-red-600 bg-red-50' : 'text-gray-400'} hover:bg-red-50 hover:text-red-600`}
                              >
                                <Heart className={`w-5 h-5 ${likedJobs.has(job.id) ? 'fill-current' : ''}`} />
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{likedJobs.has(job.id) ? 'Unlike job' : 'Like job'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <motion.div 
                    className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Posted {job.posted}
                    </div>
                    <div className="flex gap-3">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                          <ExternalLink className="w-4 h-4" />
                          View Details
                        </Button>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        className="relative overflow-hidden"
                      >
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2 relative z-10"
                        >
                          Apply Now
                        </Button>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="outline" 
            size="lg" 
            className="mt-8 border-blue-200 text-blue-700 hover:bg-blue-50 gap-2"
          >
            Load More Jobs
            <ChevronDown className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
