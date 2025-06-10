import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search,
  Filter,
  Star,
  Bookmark,
  ExternalLink,
  Building,
  Users,
  Calendar,
  ChevronDown,
  Heart,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  X,
  CheckCircle,
  Globe,
  Award,
  Brain,
  ChevronRight,
  Settings,
  BarChart3,
  Rocket,
  BookmarkCheck,
  Send,
  Plus,
  UserCheck,
  Lightbulb,
  Eye
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

interface JobFilters {
  location: string;
  experience: string;
  category: string;
  jobType: string;
  salary: string;
}

interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  tags: string[];
  matchScore: number;
  featured: boolean;
  remote: boolean;
  urgent: boolean;
  applicants: number;
  deadline?: string;
  companySize: string;
  industry: string;
  benefits: string[];
  requirements: string[];
  responsibilities: string[];
  teamSize: number;
  growth: number;
  sponsorLikely: boolean;
  verified: boolean;
  quickApply: boolean;
}

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<JobFilters>({
    location: "",
    experience: "",
    category: "",
    jobType: "",
    salary: ""
  });
  const [activeTab, setActiveTab] = useState("recommended");
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(true);
  const [aiMessage, setAIMessage] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced mock job data with match scores
  const mockJobs: Job[] = [
    {
      id: 1,
      title: "IT Software Engineer - Intern",
      company: "Murphy USA",
      logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=60&h=60&fit=crop&crop=center",
      location: "El Dorado, AR",
      type: "Internship",
      salary: "$75k - $95k",
      posted: "15 hours ago",
      description: "Join our dynamic team and contribute to innovative software solutions that serve millions of customers across the nation.",
      tags: ["Internship", "Software Development", "React", "Node.js"],
      matchScore: 77,
      featured: true,
      remote: false,
      urgent: false,
      applicants: 200,
      companySize: "1000-5000",
      industry: "Customer Service • Marketing • Public Company",
      benefits: ["Health Insurance", "401k Match", "Paid Time Off", "Professional Development"],
      requirements: ["Currently pursuing Computer Science degree", "Knowledge of programming fundamentals", "Strong problem-solving skills"],
      responsibilities: ["Develop web applications", "Collaborate with senior developers", "Participate in code reviews"],
      teamSize: 12,
      growth: 8.5,
      sponsorLikely: true,
      verified: true,
      quickApply: true
    },
    {
      id: 2,
      title: "Summer Intern (SDE)",
      company: "ChurnPilot",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center",
      location: "San Francisco Bay Area",
      type: "Internship",
      salary: "$90k - $120k",
      posted: "16 hours ago",
      description: "Work on cutting-edge software engineering projects in a fast-paced startup environment.",
      tags: ["Summer 2025", "Software Engineering", "Python", "AWS"],
      matchScore: 76,
      featured: false,
      remote: true,
      urgent: false,
      applicants: 150,
      companySize: "10-50",
      industry: "Computer Software • Early Stage",
      benefits: ["Flexible Hours", "Remote Work", "Learning Budget", "Mentorship Program"],
      requirements: ["Computer Science background", "Programming experience", "Interest in startups"],
      responsibilities: ["Build scalable applications", "Work with cloud technologies", "Participate in agile development"],
      teamSize: 8,
      growth: 25.3,
      sponsorLikely: false,
      verified: true,
      quickApply: true
    },
    {
      id: 3,
      title: "Compliance-Dallas-Analyst-Software Engineer",
      company: "Goldman Sachs",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=60&h=60&fit=crop&crop=center",
      location: "Dallas, TX",
      type: "Full-time",
      salary: "$130k - $180k",
      posted: "9 hours ago",
      description: "Join our compliance technology team to build systems that ensure regulatory adherence across global operations.",
      tags: ["Finance", "Compliance", "Java", "Spring", "Microservices"],
      matchScore: 65,
      featured: true,
      remote: false,
      urgent: true,
      applicants: 89,
      companySize: "10000+",
      industry: "Banking • Finance • Public Company",
      benefits: ["Competitive Salary", "Stock Options", "Health Benefits", "Career Development"],
      requirements: ["Bachelor's degree in Computer Science", "Java programming expertise", "Financial services interest"],
      responsibilities: ["Develop compliance software", "Collaborate with regulatory teams", "Ensure system reliability"],
      teamSize: 25,
      growth: 12.1,
      sponsorLikely: true,
      verified: true,
      quickApply: false
    },
    {
      id: 4,
      title: "Intern – AI Research Scientist",
      company: "Autodesk",
      logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=60&h=60&fit=crop&crop=center",
      location: "British Columbia, Canada",
      type: "Internship",
      salary: "No salary listed",
      posted: "1 day ago",
      description: "Contribute to groundbreaking AI research in motion generation and computer graphics applications.",
      tags: ["AI Research", "Machine Learning", "Python", "TensorFlow"],
      matchScore: 82,
      featured: true,
      remote: false,
      urgent: false,
      applicants: 45,
      companySize: "5000-10000",
      industry: "Software solutions for design and engineering",
      benefits: ["Research Environment", "Publication Opportunities", "Mentorship", "Flexible Schedule"],
      requirements: ["MS or Ph.D. pursuing in Computer Science", "Machine Learning experience", "Research background"],
      responsibilities: ["Conduct AI research", "Develop ML models", "Publish findings"],
      teamSize: 15,
      growth: 15.7,
      sponsorLikely: false,
      verified: true,
      quickApply: true
    },
    {
      id: 5,
      title: "Software Engineering Intern 2025",
      company: "Pinterest",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=60&h=60&fit=crop&crop=center",
      location: "Toronto, ON, Canada",
      type: "Internship",
      salary: "$85k - $110k",
      posted: "2 days ago",
      description: "Help build features that inspire millions of users to create the life they love through visual discovery.",
      tags: ["Software Engineering", "Scala", "React", "Distributed Systems"],
      matchScore: 79,
      featured: false,
      remote: false,
      urgent: false,
      applicants: 320,
      companySize: "1000-5000",
      industry: "Social Media • Technology",
      benefits: ["Innovative Projects", "Great Team", "Learning Opportunities", "Full-time Conversion"],
      requirements: ["Computer Science student", "Software development experience", "Passion for user experience"],
      responsibilities: ["Develop user-facing features", "Work on backend systems", "Collaborate with designers"],
      teamSize: 18,
      growth: 18.9,
      sponsorLikely: true,
      verified: true,
      quickApply: true
    },
    {
      id: 6,
      title: "AI Research Intern",
      company: "HeyGen",
      logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=60&h=60&fit=crop&crop=center",
      location: "Toronto, ON, Canada",
      type: "Internship",
      salary: "$70k - $90k",
      posted: "3 days ago",
      description: "Join our AI team to work on next-generation video synthesis and avatar technology.",
      tags: ["AI Research", "Computer Vision", "Deep Learning", "PyTorch"],
      matchScore: 74,
      featured: false,
      remote: true,
      urgent: false,
      applicants: 67,
      companySize: "50-200",
      industry: "Artificial Intelligence • Video Technology",
      benefits: ["Cutting-edge Research", "Remote Flexibility", "Mentorship", "Conference Attendance"],
      requirements: ["AI/ML background", "Computer Vision experience", "Research experience preferred"],
      responsibilities: ["Develop AI algorithms", "Improve video synthesis", "Research new techniques"],
      teamSize: 10,
      growth: 35.2,
      sponsorLikely: false,
      verified: true,
      quickApply: true
    }
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = filters.location === "" || job.location.includes(filters.location);
    const matchesExperience = filters.experience === "" || job.type.includes(filters.experience);
    const matchesCategory = filters.category === "" || job.tags.some(tag => tag.includes(filters.category));

    return matchesSearch && matchesLocation && matchesExperience && matchesCategory;
  });

  const handleSaveJob = (jobId: number) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
    } else {
      newSaved.add(jobId);
    }
    setSavedJobs(newSaved);
  };

  const handleApplyJob = (jobId: number) => {
    const newApplied = new Set(appliedJobs);
    newApplied.add(jobId);
    setAppliedJobs(newApplied);
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600 border-green-200 bg-green-50";
    if (score >= 65) return "text-blue-600 border-blue-200 bg-blue-50";
    return "text-orange-600 border-orange-200 bg-orange-50";
  };

  const getMatchScoreGradient = (score: number) => {
    if (score >= 75) return "from-green-400 to-green-600";
    if (score >= 65) return "from-blue-400 to-blue-600";
    return "from-orange-400 to-orange-600";
  };

  const clearAllFilters = () => {
    setFilters({
      location: "",
      experience: "",
      category: "",
      jobType: "",
      salary: ""
    });
    setSearchQuery("");
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== "").length + (searchQuery ? 1 : 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
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
            <div className="flex h-[calc(100vh-4rem)]">
              {/* Main Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header with Tabs and Search */}
                <div className="bg-white border-b border-gray-200 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                        <TabsList className="grid w-fit grid-cols-4">
                          <TabsTrigger value="recommended" className="flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Recommended
                          </TabsTrigger>
                          <TabsTrigger value="liked" className="flex items-center gap-2">
                            Liked
                            <Badge variant="secondary" className="ml-1">0</Badge>
                          </TabsTrigger>
                          <TabsTrigger value="applied" className="flex items-center gap-2">
                            Applied
                            <Badge variant="secondary" className="ml-1">{appliedJobs.size}</Badge>
                          </TabsTrigger>
                          <TabsTrigger value="external" className="flex items-center gap-2">
                            External
                            <Badge variant="secondary" className="ml-1">0</Badge>
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        Get Hired Faster with Turbo – Student Discount Available!
                      </Badge>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="relative flex-1">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search for roles, companies, or locations"
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
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="flex flex-wrap gap-3"
                      >
                        <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                          <SelectTrigger className="w-48">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <SelectValue placeholder="Location" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Locations</SelectItem>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="San Francisco">San Francisco</SelectItem>
                            <SelectItem value="New York">New York</SelectItem>
                            <SelectItem value="Toronto">Toronto</SelectItem>
                            <SelectItem value="Dallas">Dallas</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select value={filters.experience} onValueChange={(value) => setFilters({...filters, experience: value})}>
                          <SelectTrigger className="w-48">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              <SelectValue placeholder="Experience Level" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Levels</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                            <SelectItem value="Entry Level">Entry Level</SelectItem>
                            <SelectItem value="Mid Level">Mid Level</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                          <SelectTrigger className="w-48">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              <SelectValue placeholder="Category" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Categories</SelectItem>
                            <SelectItem value="Software">Software Engineering</SelectItem>
                            <SelectItem value="AI">AI & Machine Learning</SelectItem>
                            <SelectItem value="Data">Data Science</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Product">Product Management</SelectItem>
                          </SelectContent>
                        </Select>

                        {activeFilterCount > 0 && (
                          <Button variant="ghost" onClick={clearAllFilters} className="text-blue-600 hover:text-blue-700">
                            Clear All Filters
                          </Button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Job Listings */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Job List */}
                  <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
                    <div className="p-4">
                      <div className="text-sm text-gray-600 mb-4">
                        Showing {filteredJobs.length} of {mockJobs.length} Jobs
                      </div>
                      
                      <div className="space-y-4">
                        {filteredJobs.map((job) => (
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
                                          <p className="text-sm text-gray-500">{job.industry}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleSaveJob(job.id);
                                            }}
                                            className="p-2"
                                          >
                                            {savedJobs.has(job.id) ? (
                                              <BookmarkCheck className="w-4 h-4 text-blue-600" />
                                            ) : (
                                              <Bookmark className="w-4 h-4" />
                                            )}
                                          </Button>
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
                                      
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          {job.remote && (
                                            <Badge variant="secondary" className="text-green-600 bg-green-50 border-green-200">
                                              Remote
                                            </Badge>
                                          )}
                                          {job.urgent && (
                                            <Badge variant="secondary" className="text-red-600 bg-red-50 border-red-200">
                                              Urgent
                                            </Badge>
                                          )}
                                          {job.quickApply && (
                                            <Badge variant="secondary" className="text-blue-600 bg-blue-50 border-blue-200">
                                              Quick Apply
                                            </Badge>
                                          )}
                                        </div>
                                        
                                        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getMatchScoreColor(job.matchScore)}`}>
                                          {job.matchScore}% Match
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Job Detail Panel */}
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
                                  <p className="text-sm text-gray-500">{selectedJob.companySize} employees</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  onClick={() => handleSaveJob(selectedJob.id)}
                                  className="gap-2"
                                >
                                  {savedJobs.has(selectedJob.id) ? (
                                    <>
                                      <BookmarkCheck className="w-4 h-4" />
                                      Saved
                                    </>
                                  ) : (
                                    <>
                                      <Bookmark className="w-4 h-4" />
                                      Save
                                    </>
                                  )}
                                </Button>
                                <Button
                                  onClick={() => handleApplyJob(selectedJob.id)}
                                  disabled={appliedJobs.has(selectedJob.id)}
                                  className="bg-blue-600 hover:bg-blue-700 gap-2"
                                >
                                  {appliedJobs.has(selectedJob.id) ? (
                                    <>
                                      <CheckCircle className="w-4 h-4" />
                                      Applied
                                    </>
                                  ) : (
                                    <>
                                      <Send className="w-4 h-4" />
                                      Apply
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                            
                            {/* Match Score Circle */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                <div className="text-center">
                                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center relative ${getMatchScoreColor(selectedJob.matchScore)}`}>
                                    <div className="text-2xl font-bold">
                                      {selectedJob.matchScore}%
                                    </div>
                                  </div>
                                  <div className="mt-2 text-sm font-medium text-green-600">
                                    GOOD MATCH
                                  </div>
                                  {selectedJob.sponsorLikely && (
                                    <div className="text-xs text-green-600 mt-1">
                                      ✓ H1B Sponsor Likely
                                    </div>
                                  )}
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    {selectedJob.location}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Briefcase className="w-4 h-4" />
                                    {selectedJob.type}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <DollarSign className="w-4 h-4" />
                                    {selectedJob.salary}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    {selectedJob.applicants}+ applicants
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Job Details Tabs */}
                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 m-6 mb-0">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="company">Company</TabsTrigger>
                              <TabsTrigger value="insights">Insights</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="overview" className="p-6 pt-4">
                              <div className="space-y-6">
                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Summary</h3>
                                  <p className="text-gray-700 leading-relaxed">
                                    {selectedJob.description}
                                  </p>
                                </div>

                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                                  <ul className="space-y-2">
                                    {selectedJob.requirements.map((req, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                                  <ul className="space-y-2">
                                    {selectedJob.responsibilities.map((resp, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-700">{resp}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                                  <div className="grid grid-cols-2 gap-3">
                                    {selectedJob.benefits.map((benefit, index) => (
                                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <Award className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm text-gray-700">{benefit}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Skills</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedJob.tags.map((tag, index) => (
                                      <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="company" className="p-6 pt-4">
                              <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                  <Avatar className="w-16 h-16">
                                    <AvatarImage src={selectedJob.logo} alt={selectedJob.company} />
                                    <AvatarFallback>{selectedJob.company.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-xl font-bold">{selectedJob.company}</h3>
                                    <p className="text-gray-600">{selectedJob.companySize} employees</p>
                                    <p className="text-sm text-gray-500">{selectedJob.industry}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Users className="w-5 h-5 text-blue-600" />
                                      <span className="font-medium">Team Size</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{selectedJob.teamSize}</p>
                                  </div>
                                  <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <TrendingUp className="w-5 h-5 text-green-600" />
                                      <span className="font-medium">Growth Rate</span>
                                    </div>
                                    <p className="text-2xl font-bold text-green-600">+{selectedJob.growth}%</p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-3">About {selectedJob.company}</h4>
                                  <p className="text-gray-700 leading-relaxed">
                                    {selectedJob.company} is a leading company in the {selectedJob.industry.split('•')[0].trim()} industry, 
                                    committed to innovation and excellence. We foster a collaborative environment where talented 
                                    individuals can grow their careers and make meaningful contributions.
                                  </p>
                                </div>

                                {selectedJob.verified && (
                                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle className="w-5 h-5 text-green-600" />
                                      <span className="font-medium text-green-800">Verified Employer</span>
                                    </div>
                                    <p className="text-sm text-green-700 mt-1">
                                      This company has been verified and is trusted by our platform.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </TabsContent>

                            <TabsContent value="insights" className="p-6 pt-4">
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Eye className="w-5 h-5 text-blue-600" />
                                      <span className="font-medium">Views</span>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-600">{selectedJob.applicants * 5}</p>
                                  </div>
                                  <div className="p-4 bg-purple-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Users className="w-5 h-5 text-purple-600" />
                                      <span className="font-medium">Applicants</span>
                                    </div>
                                    <p className="text-2xl font-bold text-purple-600">{selectedJob.applicants}+</p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-3">Why you're a good match</h4>
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                                      <span className="text-gray-700">Your skills align well with the requirements</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                                      <span className="text-gray-700">Experience level matches the position</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                      <span className="text-gray-700">Location preference partially matches</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                      <span className="text-gray-700">
                                        <a 
                                          href="/resume-builder" 
                                          className="text-blue-600 hover:underline font-medium"
                                        >
                                          Optimize your resume for this job →
                                        </a>
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                                    <span className="font-medium text-yellow-800">Pro Tip</span>
                                  </div>
                                  <p className="text-sm text-yellow-700">
                                    This company has a high response rate for applications submitted within 48 hours of posting.
                                  </p>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium">Select a job to view details</p>
                          <p className="text-sm">Choose from the jobs listed on the left to see more information</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Assistant Sidebar */}
              <AnimatePresence>
                {showAIAssistant && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 350, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="bg-white border-l border-gray-200 flex flex-col"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Buddy</h3>
                            <p className="text-sm text-gray-500">Your AI Copilot</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAIAssistant(false)}
                          className="p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1 p-4">
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-blue-800 font-medium mb-2">
                          Great! You've just unlocked your Chat with me, Buddy!
                        </p>
                        
                        <div className="space-y-3 text-sm">
                          <div className="font-medium text-gray-900">Tasks I can assist you with:</div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Settings className="w-4 h-4 text-blue-600" />
                              <span>Adjust current preference</span>
                            </div>
                            <div className="text-xs text-gray-600 ml-6">
                              • Fine-tune your job search criteria.
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-600" />
                              <span>Top Match jobs</span>
                            </div>
                            <div className="text-xs text-gray-600 ml-6">
                              • Explore jobs where you shine as a top candidate.
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <MessageCircle className="w-4 h-4 text-green-600" />
                              <span>Ask Buddy</span>
                            </div>
                            <div className="text-xs text-gray-600 ml-6">
                              • Click on 'Ask Buddy' to get detailed insights on specific job.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 h-auto p-3"
                          onClick={() => {}}
                        >
                          <Settings className="w-4 h-4" />
                          <div className="text-left">
                            <div className="font-medium">Adjust current preference</div>
                            <div className="text-xs text-gray-500">Fine-tune your job search criteria.</div>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 h-auto p-3"
                          onClick={() => {}}
                        >
                          <Star className="w-4 h-4 text-yellow-600" />
                          <div className="text-left">
                            <div className="font-medium">Top Match jobs</div>
                            <div className="text-xs text-gray-500">Explore jobs where you shine as a top candidate.</div>
                          </div>
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 h-auto p-3"
                          onClick={() => {}}
                        >
                          <MessageCircle className="w-4 h-4 text-green-600" />
                          <div className="text-left">
                            <div className="font-medium">Ask Buddy</div>
                            <div className="text-xs text-gray-500">Click on 'Ask Buddy' to get detailed insights on specific job.</div>
                          </div>
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Ask me anything..."
                          value={aiMessage}
                          onChange={(e) => setAIMessage(e.target.value)}
                          className="flex-1 min-h-[80px] resize-none"
                        />
                        <Button size="sm" className="self-end">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating AI Assistant Toggle */}
              {!showAIAssistant && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="fixed bottom-6 right-6 z-50"
                >
                  <Button
                    onClick={() => setShowAIAssistant(true)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                  >
                    <Brain className="w-6 h-6 text-white" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Jobs;
