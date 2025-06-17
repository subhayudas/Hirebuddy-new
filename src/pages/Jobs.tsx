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
import { JobList } from "@/components/jobs/JobList";

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
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-b border-red-200 px-6 py-3">
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
            </div>
          )}
          
          <div className="flex h-[calc(100vh-4rem)]">
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
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search jobs, companies, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>

                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-gray-600"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Filters Panel */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <Input
                            placeholder="City, State, or Remote"
                            value={filters.location}
                            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Experience Level
                          </label>
                          <Select 
                            value={filters.experience} 
                            onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Any level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Any level</SelectItem>
                              <SelectItem value="Internship">Internship</SelectItem>
                              <SelectItem value="Entry">Entry Level</SelectItem>
                              <SelectItem value="Mid">Mid Level</SelectItem>
                              <SelectItem value="Senior">Senior Level</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Work Type
                          </label>
                          <Select 
                            value={filters.remote} 
                            onValueChange={(value) => setFilters(prev => ({ ...prev, remote: value as 'all' | 'remote' | 'onsite' }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="All types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All types</SelectItem>
                              <SelectItem value="remote">Remote only</SelectItem>
                              <SelectItem value="onsite">On-site only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company
                          </label>
                          <Input
                            placeholder="Company name"
                            value={filters.company}
                            onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
                    
                    <JobList 
                      jobs={jobs}
                      isLoading={isLoading}
                      searchQuery={searchQuery}
                      onJobClick={handleJobClick}
                    />
                  </div>
                </div>

                {/* Job Details Panel */}
                <div className="w-1/2 bg-gray-50">
                  {selectedJob ? (
                    <div className="p-6 h-full overflow-y-auto">
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-start gap-4 mb-6">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={selectedJob.logo} alt={selectedJob.company} />
                            <AvatarFallback>{selectedJob.company.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                              {selectedJob.title}
                            </h1>
                            <p className="text-lg text-gray-600 mb-2">{selectedJob.company}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {selectedJob.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {selectedJob.type}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {selectedJob.posted}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {selectedJob.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                            <div className="prose prose-sm max-w-none text-gray-700">
                              <p>{selectedJob.description}</p>
                            </div>
                          </div>
                          
                          {selectedJob.experienceRequired && (
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience Required</h3>
                              <p className="text-gray-700">{selectedJob.experienceRequired}</p>
                            </div>
                          )}
                          
                          <div className="flex gap-3 pt-6 border-t border-gray-200">
                            <Button
                              onClick={() => handleApplyJob(selectedJob)}
                              className="flex-1"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Apply Now
                            </Button>
                            <Button variant="outline">
                              <Bookmark className="w-4 h-4 mr-2" />
                              Save Job
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Select a job to view details</p>
                        <p className="text-sm">Click on any job from the list to see more information</p>
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