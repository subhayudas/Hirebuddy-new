import { NewSidebar } from "@/components/layout/NewSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
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
  RefreshCw
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Import our new types and hooks
import { Job, JobFilters } from "@/types/job";
import { useJobs, useJobStats } from "@/hooks/useJobs";
import { JobService } from "@/services/jobService";

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

  // Handle job selection
  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  // Handle apply to job
  const handleApplyJob = (job: Job) => {
    if (job.applyLink) {
      window.open(job.applyLink, '_blank');
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
  };

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(value => value !== "" && value !== "all").length + (searchQuery ? 1 : 0);

  // Check if we're in offline mode
  const isOfflineMode = JobService.isOfflineMode();

  // Development utility to test offline mode
  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <NewSidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Jobs
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex-1 relative overflow-hidden">
          {/* Offline Mode Banner */}
          {isOfflineMode && (
            <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800">
                    Offline Mode - Showing Sample Jobs
                  </p>
                  <p className="text-xs text-amber-700">
                    Database connection unavailable. You're viewing sample job data for demonstration purposes.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    JobService.resetOfflineMode();
                    refetch();
                  }}
                  className="text-amber-700 border-amber-300 hover:bg-amber-100"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Connection
                </Button>
              </div>
            </div>
          )}
          
          <div className={`flex ${isOfflineMode ? 'h-[calc(100vh-8rem)]' : 'h-[calc(100vh-4rem)]'}`}>
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header with Stats and Search */}
              <div className="bg-white border-b border-gray-200 p-6 space-y-4">
                {/* Stats Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        {statsLoading ? (
                          <Skeleton className="h-4 w-16" />
                        ) : (
                          `${stats?.total || 0} Total Jobs`
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        {statsLoading ? (
                          <Skeleton className="h-4 w-20" />
                        ) : (
                          `${stats?.remote || 0} Remote Jobs`
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        {statsLoading ? (
                          <Skeleton className="h-4 w-24" />
                        ) : (
                          `${stats?.companies || 0} Companies`
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    {statsLoading ? (
                      <Skeleton className="h-4 w-16" />
                    ) : (
                      `${stats?.thisWeek || 0} New This Week`
                    )}
                  </Badge>
                  
                  {/* Development utility - only show in development */}
                  {isDevelopment && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (isOfflineMode) {
                          JobService.resetOfflineMode();
                          refetch();
                        } else {
                          JobService.forceOfflineMode();
                          refetch();
                        }
                      }}
                      className="text-xs"
                    >
                      {isOfflineMode ? 'Exit Offline Mode' : 'Test Offline Mode'}
                    </Button>
                  )}
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search for jobs, companies, or locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowFilters(!showFilters)}
                      className="h-12 px-4 gap-2"
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                      {activeFilterCount > 0 && (
                        <Badge variant="secondary" className="ml-1">{activeFilterCount}</Badge>
                      )}
                    </Button>
                    
                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger className="w-[180px] h-12">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="created_at">Date Posted</SelectItem>
                        <SelectItem value="job_title">Job Title</SelectItem>
                        <SelectItem value="company_name">Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Filter Pills */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-4 border-t border-gray-100"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                          <Input
                            placeholder="Enter location"
                            value={filters.location}
                            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Experience</label>
                          <Input
                            placeholder="e.g. Entry, Senior, Intern"
                            value={filters.experience}
                            onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Remote</label>
                          <Select value={filters.remote} onValueChange={(value: any) => setFilters(prev => ({ ...prev, remote: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Jobs</SelectItem>
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
                            onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {activeFilterCount > 0 && (
                            <Button variant="outline" size="sm" onClick={clearAllFilters} className="gap-2">
                              <X className="w-4 h-4" />
                              Clear All
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Jobs Content */}
              <div className="flex-1 flex overflow-hidden">
                {/* Job List */}
                <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
                  <div className="p-4">
                    <div className="text-sm text-gray-600 mb-4 flex items-center justify-between">
                      <span>
                        {isLoading ? (
                          <Skeleton className="h-4 w-32" />
                        ) : (
                          `Showing ${jobs.length} of ${totalJobs} jobs`
                        )}
                      </span>
                      {isLoading && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                    </div>
                    
                    {isLoading ? (
                      // Loading skeletons
                      <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Card key={i}>
                            <CardContent className="p-6">
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
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : jobs.length === 0 ? (
                      // Empty state
                      <div className="text-center py-12">
                        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-500 mb-4">
                          {searchQuery || activeFilterCount > 0 
                            ? "Try adjusting your search or filters" 
                            : "No jobs have been posted yet"}
                        </p>
                        {(searchQuery || activeFilterCount > 0) && (
                          <Button variant="outline" onClick={clearAllFilters}>
                            Clear filters
                          </Button>
                        )}
                      </div>
                    ) : (
                      // Job cards
                      <div className="space-y-4">
                        {jobs.map((job) => (
                          <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`cursor-pointer transition-all duration-200 ${
                              selectedJob?.id === job.id ? 'ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => handleJobClick(job)}
                          >
                            <Card className="hover:shadow-md transition-shadow duration-200">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-4 flex-1">
                                    <Avatar className="w-12 h-12">
                                      <AvatarImage src={job.logo} alt={job.company} />
                                      <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    
                                    <div className="flex-1 space-y-2">
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors">
                                            {job.title}
                                          </h3>
                                          <p className="text-gray-600">{job.company}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                          <MapPin className="w-4 h-4" />
                                          {job.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Briefcase className="w-4 h-4" />
                                          {job.type}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Clock className="w-4 h-4" />
                                          {job.posted}
                                        </div>
                                      </div>
                                      
                                      <p className="text-gray-700 text-sm line-clamp-2">
                                        {job.description}
                                      </p>
                                      
                                      <div className="flex flex-wrap gap-2">
                                        {job.isRemote && (
                                          <Badge variant="secondary" className="text-xs">Remote</Badge>
                                        )}
                                        {job.tags.slice(0, 3).map((tag, index) => (
                                          <Badge key={index} variant="outline" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Job Details Panel */}
                <div className="w-1/2 overflow-y-auto bg-gray-50">
                  {selectedJob ? (
                    <div className="p-6">
                      <div className="bg-white rounded-lg shadow-sm border">
                        {/* Job Header */}
                        <div className="p-6 border-b">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={selectedJob.logo} alt={selectedJob.company} />
                                <AvatarFallback>{selectedJob.company.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                  {selectedJob.title}
                                </h1>
                                <p className="text-lg text-gray-700 mb-1">{selectedJob.company}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {selectedJob.location}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {selectedJob.posted}
                                  </div>
                                  {selectedJob.isRemote && (
                                    <Badge variant="secondary">Remote</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Button 
                              onClick={() => handleApplyJob(selectedJob)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                              {selectedJob.applyLink ? 'Apply Now' : 'View Details'}
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Job Content */}
                        <div className="p-6">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                              <div className="prose prose-sm max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                  {selectedJob.description}
                                </p>
                              </div>
                            </div>

                            {selectedJob.experienceRequired && (
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Experience Required</h3>
                                <p className="text-gray-700">{selectedJob.experienceRequired}</p>
                              </div>
                            )}

                            <div>
                              <h3 className="text-lg font-semibold mb-3">Job Details</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="text-sm font-medium text-gray-600">Type</div>
                                  <div className="text-gray-900">{selectedJob.type}</div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="text-sm font-medium text-gray-600">Location</div>
                                  <div className="text-gray-900">{selectedJob.location}</div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="text-sm font-medium text-gray-600">Remote</div>
                                  <div className="text-gray-900">{selectedJob.isRemote ? 'Yes' : 'No'}</div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <div className="text-sm font-medium text-gray-600">Posted</div>
                                  <div className="text-gray-900">{selectedJob.posted}</div>
                                </div>
                              </div>
                            </div>

                            {selectedJob.tags.length > 0 && (
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                  {selectedJob.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Select a job to view details</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs; 