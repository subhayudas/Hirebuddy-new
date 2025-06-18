import { NewSidebar } from "@/components/layout/NewSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search,
  Filter,
  Bookmark,
  ExternalLink,
  X,
  Loader2,
  AlertCircle,
  RefreshCw,
  Star,
  Heart,
  TrendingUp,
  Building,
  Users,
  DollarSign,
  Calendar,
  Eye,
  BookmarkCheck,
  Send,
  Target,
  Zap,
  ChevronDown,
  SlidersHorizontal,
  Globe,
  MapPin as LocationIcon
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Import our types and hooks
import { Job, JobFilters } from "@/types/job";
import { useJobs, useJobStats } from "@/hooks/useJobs";

const Jobs = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<JobFilters>({
    location: "",
    experience: "",
    remote: "all",
    company: ""
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'created_at' | 'job_title' | 'company_name'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeTab, setActiveTab] = useState('all');
  const [showJobDetails, setShowJobDetails] = useState(false);

  // Prepare search parameters
  const searchParams = useMemo(() => ({
    query: searchQuery || undefined,
    filters: Object.keys(filters).length > 0 ? filters : undefined,
    sortBy,
    sortOrder,
    limit: 50
  }), [searchQuery, filters, sortBy, sortOrder]);

  // Fetch jobs and stats
  const { data: jobsData, isLoading, error, refetch } = useJobs(searchParams);
  const { data: stats, isLoading: statsLoading } = useJobStats();

  const jobs = jobsData?.jobs || [];
  const totalJobs = jobsData?.total || 0;

  // Filter jobs based on active tab
  const filteredJobs = useMemo(() => {
    switch (activeTab) {
      case 'saved':
        return jobs.filter(job => savedJobs.has(job.id));
      case 'applied':
        return jobs.filter(job => appliedJobs.has(job.id));
      case 'remote':
        return jobs.filter(job => job.isRemote);
      case 'recent':
        return jobs.filter(job => {
          const jobDate = new Date(job.createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return jobDate >= weekAgo;
        });
      default:
        return jobs;
    }
  }, [jobs, activeTab, savedJobs, appliedJobs]);

  // Handle job selection
  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  // Handle save job
  const handleSaveJob = (jobId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
      toast.success('Job removed from saved');
    } else {
      newSaved.add(jobId);
      toast.success('Job saved successfully');
    }
    setSavedJobs(newSaved);
  };

  // Handle apply to job
  const handleApplyJob = (job: Job, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (job.applyLink) {
      window.open(job.applyLink, '_blank');
      const newApplied = new Set(appliedJobs);
      newApplied.add(job.id);
      setAppliedJobs(newApplied);
      toast.success('Application opened in new tab');
    } else {
      toast.info('No application link available for this job');
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      location: "",
      experience: "",
      remote: "all",
      company: ""
    });
    setSearchQuery("");
    toast.info('All filters cleared');
  };

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(value => value !== "" && value !== "all").length + (searchQuery ? 1 : 0);

  // Get tab counts
  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'saved':
        return savedJobs.size;
      case 'applied':
        return appliedJobs.size;
      case 'remote':
        return jobs.filter(job => job.isRemote).length;
      case 'recent':
        return jobs.filter(job => {
          const jobDate = new Date(job.createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return jobDate >= weekAgo;
        }).length;
      default:
        return jobs.length;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <NewSidebar />
        <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
            <div className="flex items-center gap-2 px-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Job Search
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Error State */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-b border-red-200 px-6 py-3"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">
                    Failed to Load Jobs
                  </p>
                  <p className="text-xs text-red-700">
                    There was an error loading jobs from the database. Please try again.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => refetch()}
                  className="text-red-700 border-red-300 hover:bg-red-100"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </motion.div>
          )}

          <div className="flex-1 flex overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Search and Stats Header */}
              <div className="bg-white border-b border-gray-200 p-6 space-y-4">
                {/* Compact Stats Row */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Total Jobs</p>
                        <p className="text-lg font-bold text-blue-900">
                          {statsLoading ? <Skeleton className="h-5 w-10" /> : stats?.total || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-green-600 font-medium">Remote</p>
                        <p className="text-lg font-bold text-green-900">
                          {statsLoading ? <Skeleton className="h-5 w-10" /> : stats?.remote || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Building className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-purple-600 font-medium">Companies</p>
                        <p className="text-lg font-bold text-purple-900">
                          {statsLoading ? <Skeleton className="h-5 w-10" /> : stats?.companies || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-orange-600 font-medium">This Week</p>
                        <p className="text-lg font-bold text-orange-900">
                          {statsLoading ? <Skeleton className="h-5 w-10" /> : stats?.thisWeek || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search jobs, companies, skills, or locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 h-11 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-11 px-5 border-2 border-gray-200 hover:border-blue-500 transition-colors relative"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>

                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-44 h-11 border-2 border-gray-200">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at">Date Posted</SelectItem>
                      <SelectItem value="job_title">Job Title</SelectItem>
                      <SelectItem value="company_name">Company</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                          <Input
                            placeholder="City, State, or Remote"
                            value={filters.location}
                            onChange={(e) => setFilters({...filters, location: e.target.value})}
                            className="border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Experience Level</label>
                          <Select value={filters.experience} onValueChange={(value) => setFilters({...filters, experience: value})}>
                            <SelectTrigger className="border-gray-300">
                              <SelectValue placeholder="Any Experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Any Experience</SelectItem>
                              <SelectItem value="entry">Entry Level</SelectItem>
                              <SelectItem value="mid">Mid Level</SelectItem>
                              <SelectItem value="senior">Senior Level</SelectItem>
                              <SelectItem value="lead">Lead/Principal</SelectItem>
                              <SelectItem value="intern">Internship</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Work Type</label>
                          <Select value={filters.remote} onValueChange={(value: any) => setFilters({...filters, remote: value})}>
                            <SelectTrigger className="border-gray-300">
                              <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="remote">Remote Only</SelectItem>
                              <SelectItem value="onsite">On-site Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Company</label>
                          <Input
                            placeholder="Company name"
                            value={filters.company}
                            onChange={(e) => setFilters({...filters, company: e.target.value})}
                            className="border-gray-300"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={clearAllFilters}>
                          Clear All
                        </Button>
                        <Button onClick={() => setShowFilters(false)}>
                          Apply Filters
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tabs Navigation */}
              <div className="bg-white border-b border-gray-200 px-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-gray-100">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      All Jobs
                      <Badge variant="secondary" className="ml-1">
                        {getTabCount('all')}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="saved" className="flex items-center gap-2">
                      <BookmarkCheck className="w-4 h-4" />
                      Saved
                      <Badge variant="secondary" className="ml-1">
                        {getTabCount('saved')}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="applied" className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Applied
                      <Badge variant="secondary" className="ml-1">
                        {getTabCount('applied')}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="remote" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Remote
                      <Badge variant="secondary" className="ml-1">
                        {getTabCount('remote')}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Recent
                      <Badge variant="secondary" className="ml-1">
                        {getTabCount('recent')}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Jobs List */}
              <div className="flex-1 overflow-auto p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Card key={i} className="p-6">
                        <div className="flex items-start gap-4">
                          <Skeleton className="w-12 h-12 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <div className="flex gap-2">
                              <Skeleton className="h-6 w-16" />
                              <Skeleton className="h-6 w-20" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : filteredJobs.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchQuery || activeFilterCount > 0
                        ? "Try adjusting your search criteria or filters"
                        : "No jobs are available at the moment. Check back later!"
                      }
                    </p>
                    {(searchQuery || activeFilterCount > 0) && (
                      <Button onClick={clearAllFilters} variant="outline">
                        Clear All Filters
                      </Button>
                    )}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {filteredJobs.map((job, index) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ y: -2 }}
                          onClick={() => handleJobClick(job)}
                        >
                          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                {/* Company Logo */}
                                <div className="relative">
                                  <Avatar className="w-14 h-14 border-2 border-gray-100">
                                    <AvatarImage src={job.logo} alt={job.company} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                      {job.company.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {job.isRemote && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                      <Globe className="w-3 h-3 text-white" />
                                    </div>
                                  )}
                                </div>

                                {/* Job Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {job.title}
                                      </h3>
                                      <p className="text-gray-600 font-medium">{job.company}</p>
                                      
                                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                          <LocationIcon className="w-4 h-4" />
                                          <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Clock className="w-4 h-4" />
                                          <span>{job.posted}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Briefcase className="w-4 h-4" />
                                          <span>{job.type}</span>
                                        </div>
                                      </div>

                                      <p className="text-gray-600 mt-2 line-clamp-2">
                                        {job.description}
                                      </p>

                                      {/* Tags */}
                                      <div className="flex flex-wrap gap-2 mt-3">
                                        {job.tags.slice(0, 4).map((tag, tagIndex) => (
                                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                        {job.tags.length > 4 && (
                                          <Badge variant="outline" className="text-xs">
                                            +{job.tags.length - 4} more
                                          </Badge>
                                        )}
                                      </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => handleSaveJob(job.id, e)}
                                            className={`${savedJobs.has(job.id) ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600'}`}
                                          >
                                            <Bookmark className={`w-4 h-4 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          {savedJobs.has(job.id) ? 'Remove from saved' : 'Save job'}
                                        </TooltipContent>
                                      </Tooltip>

                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => handleApplyJob(job, e)}
                                            className="text-gray-400 hover:text-green-600"
                                          >
                                            <ExternalLink className="w-4 h-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          Apply to job
                                        </TooltipContent>
                                      </Tooltip>

                                      <Button
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleApplyJob(job);
                                        }}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                        disabled={appliedJobs.has(job.id)}
                                      >
                                        {appliedJobs.has(job.id) ? (
                                          <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Applied
                                          </>
                                        ) : (
                                          <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Apply
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Job Details Sidebar */}
            <AnimatePresence>
              {selectedJob && showJobDetails && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  className="w-96 bg-white border-l border-gray-200 flex flex-col"
                >
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={selectedJob.logo} alt={selectedJob.company} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {selectedJob.company.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                            {selectedJob.title}
                          </h2>
                          <p className="text-gray-600">{selectedJob.company}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowJobDetails(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto p-6 space-y-6">
                    {/* Job Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <LocationIcon className="w-4 h-4" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Posted {selectedJob.posted}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>{selectedJob.type}</span>
                      </div>
                      {selectedJob.isRemote && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <Globe className="w-4 h-4" />
                          <span>Remote Work Available</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Tags */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Skills & Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Job Description</h3>
                      <div className="text-sm text-gray-600 whitespace-pre-wrap">
                        {selectedJob.description}
                      </div>
                    </div>

                    {selectedJob.experienceRequired && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">Experience Required</h3>
                          <p className="text-sm text-gray-600">{selectedJob.experienceRequired}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 border-t border-gray-200 space-y-3">
                    <Button
                      onClick={() => handleApplyJob(selectedJob)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={appliedJobs.has(selectedJob.id)}
                    >
                      {appliedJobs.has(selectedJob.id) ? (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Applied
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply Now
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleSaveJob(selectedJob.id)}
                      className="w-full"
                    >
                      <Bookmark className={`w-4 h-4 mr-2 ${savedJobs.has(selectedJob.id) ? 'fill-current' : ''}`} />
                      {savedJobs.has(selectedJob.id) ? 'Saved' : 'Save Job'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Jobs; 