import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { EnhancedJobCard } from "@/components/jobs/EnhancedJobCard";
import { DynamicFilters } from "@/components/jobs/DynamicFilters";
import { FloatingParticles } from "@/components/jobs/FloatingParticles";
import { JobMarketTrends } from "@/components/jobs/JobMarketTrends";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Sparkles,
  Target,
  Users,
  Globe,
  Award,
  Star,
  Zap,
  BarChart3,
  Eye,
  Filter,
  Layout,
  Grid,
  List,
  ChevronRight,
  Rocket,
  Brain,
  Heart
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface JobFilters {
  location: string;
  jobType: string;
  experience: string;
  salary: string;
  company: string;
  datePosted: string;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  tags: string[];
  logo: string;
  featured: boolean;
  remote: boolean;
  urgent: boolean;
  requirements?: string[];
  benefits?: string[];
  teamSize?: number;
  companySize?: string;
  industry?: string;
  growth?: number;
}

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<JobFilters>({
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    company: "",
    datePosted: ""
  });
  
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const [likedJobs, setLikedJobs] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showTrends, setShowTrends] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [personalizedScore, setPersonalizedScore] = useState(0);

  // Enhanced mock job data with more details
  const mockJobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      posted: "2 days ago",
      description: "We're looking for a skilled Frontend Developer to join our dynamic team and build the next generation of web applications with cutting-edge technologies.",
      tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=60&h=60&fit=crop&crop=center",
      featured: true,
      remote: true,
      urgent: false,
      requirements: ["5+ years React experience", "TypeScript proficiency", "Modern CSS frameworks"],
      benefits: ["Health insurance", "Stock options", "Flexible hours"],
      teamSize: 12,
      companySize: "50-200",
      industry: "Technology",
      growth: 15.2
    },
    {
      id: 2,
      title: "AI Product Manager",
      company: "InnovateLab",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $200k",
      posted: "1 day ago",
      description: "Lead product strategy and development for our revolutionary AI-powered solutions that are transforming industries worldwide.",
      tags: ["Product Strategy", "AI/ML", "Agile", "Analytics", "Leadership"],
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center",
      featured: false,
      remote: true,
      urgent: true,
      requirements: ["Product management experience", "AI/ML knowledge", "Strategic thinking"],
      benefits: ["Equity package", "Learning budget", "Remote-first culture"],
      teamSize: 8,
      companySize: "20-50",
      industry: "Artificial Intelligence",
      growth: 25.8
    },
    {
      id: 3,
      title: "Senior UX/UI Designer",
      company: "Design Studio Pro",
      location: "New York, NY",
      type: "Contract",
      salary: "$90k - $140k",
      posted: "3 days ago",
      description: "Create beautiful and intuitive user experiences for our mobile and web applications, working closely with product and engineering teams.",
      tags: ["Figma", "Prototyping", "User Research", "Design Systems", "Mobile Design"],
      logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=60&h=60&fit=crop&crop=center",
      featured: true,
      remote: false,
      urgent: false,
      requirements: ["5+ years UX/UI experience", "Figma expertise", "Portfolio required"],
      benefits: ["Creative freedom", "Modern tools", "Design team collaboration"],
      teamSize: 6,
      companySize: "10-50",
      industry: "Design Agency",
      growth: 8.5
    },
    {
      id: 4,
      title: "Data Scientist - ML Engineering",
      company: "AI Innovations Corp",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$140k - $220k",
      posted: "5 days ago",
      description: "Analyze complex datasets and build machine learning models to drive business insights and automate decision-making processes.",
      tags: ["Python", "Machine Learning", "SQL", "TensorFlow", "AWS", "Statistics"],
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=60&h=60&fit=crop&crop=center",
      featured: false,
      remote: true,
      urgent: false,
      requirements: ["PhD or Masters in relevant field", "Python/R proficiency", "ML frameworks"],
      benefits: ["Research time", "Conference budget", "Cutting-edge tech"],
      teamSize: 15,
      companySize: "200-500",
      industry: "Data & Analytics",
      growth: 18.3
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudScale Solutions",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$110k - $160k",
      posted: "1 week ago",
      description: "Build and maintain scalable cloud infrastructure, automate deployment pipelines, and ensure high availability of our services.",
      tags: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Monitoring"],
      logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=60&h=60&fit=crop&crop=center",
      featured: false,
      remote: true,
      urgent: false,
      requirements: ["AWS certification preferred", "Container orchestration", "Infrastructure as Code"],
      benefits: ["Cloud credits", "Certification support", "On-call compensation"],
      teamSize: 10,
      companySize: "100-200",
      industry: "Cloud Services",
      growth: 12.7
    },
    {
      id: 6,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$95k - $145k",
      posted: "4 days ago",
      description: "Join our fast-growing startup and work on exciting projects that impact millions of users. Full ownership of features from conception to deployment.",
      tags: ["React", "Node.js", "PostgreSQL", "GraphQL", "AWS", "Agile"],
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center",
      featured: true,
      remote: true,
      urgent: true,
      requirements: ["Full-stack experience", "Modern JavaScript", "Database design"],
      benefits: ["Equity", "Flexible schedule", "Growth opportunities"],
      teamSize: 5,
      companySize: "10-20",
      industry: "Startup",
      growth: 45.2
    }
  ];

  // Categories for quick access
  const categories = [
    { name: "AI & Machine Learning", count: 342, icon: Brain, color: "text-purple-600", gradient: "from-purple-400 to-purple-600" },
    { name: "Remote First", count: 1865, icon: Globe, color: "text-green-600", gradient: "from-green-400 to-green-600" },
    { name: "Frontend Development", count: 1243, icon: Briefcase, color: "text-blue-600", gradient: "from-blue-400 to-blue-600" },
    { name: "Data Science", count: 756, icon: BarChart3, color: "text-indigo-600", gradient: "from-indigo-400 to-indigo-600" },
    { name: "Product Management", count: 532, icon: Target, color: "text-orange-600", gradient: "from-orange-400 to-orange-600" },
    { name: "Design", count: 423, icon: Heart, color: "text-pink-600", gradient: "from-pink-400 to-pink-600" },
  ];

  // Animation for page load
  useEffect(() => {
    setIsLoaded(true);
    // Simulate personalized score calculation
    setTimeout(() => {
      setPersonalizedScore(87);
    }, 1500);
  }, []);
  
  const handleSave = (jobId: number) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
    } else {
      newSaved.add(jobId);
    }
    setSavedJobs(newSaved);
  };

  const handleLike = (jobId: number) => {
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
  };

  const filteredJobs = mockJobs.filter(job => {
    return searchQuery === "" || 
           job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
           job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

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
                    <BreadcrumbPage className="font-semibold">Find Your Dream Job</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          
          <div className="flex-1 relative overflow-hidden">
            {/* Floating Particles Background */}
            <FloatingParticles count={15} className="fixed inset-0 z-0" />
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 p-6 space-y-8"
            >
              {/* Hero Section */}
              <motion.div 
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-2xl"
              >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 20,
                      ease: "linear" 
                    }}
                    className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                  />
                  <motion.div 
                    animate={{ 
                      scale: [1.2, 1, 1.2],
                      rotate: [360, 180, 0],
                      opacity: [0.05, 0.15, 0.05]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 25,
                      ease: "linear",
                      delay: 2
                    }}
                    className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl"
                  />
                </div>
                
                <div className="relative px-8 py-12 md:py-16">
                  <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                      <div className="lg:col-span-2 space-y-6">
                        <motion.div
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Find Your Perfect
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                              Career Match
                            </span>
                          </h1>
                          <p className="text-xl md:text-2xl text-blue-100 mt-4 leading-relaxed">
                            AI-powered job matching that understands your potential
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="flex flex-wrap gap-4 items-center"
                        >
                          <div className="flex items-center gap-2 text-blue-200">
                            <Users className="w-5 h-5" />
                            <span>15,420+ Active Jobs</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-200">
                            <Rocket className="w-5 h-5" />
                            <span>2,340+ Companies</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-200">
                            <Award className="w-5 h-5" />
                            <span>98% Match Accuracy</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Personalized Score Card */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                      >
                        <div className="text-center space-y-4">
                          <div className="flex items-center justify-center gap-2">
                            <Target className="w-6 h-6 text-yellow-300" />
                            <span className="text-lg font-semibold">Your Match Score</span>
                          </div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, delay: 1.5, type: "spring" }}
                            className="relative w-24 h-24 mx-auto"
                          >
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="white"
                                strokeOpacity="0.2"
                                strokeWidth="8"
                                fill="none"
                              />
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: personalizedScore / 100 }}
                                transition={{ duration: 2, delay: 1.5 }}
                                style={{
                                  strokeDasharray: "251.2",
                                  strokeDashoffset: 251.2 * (1 - personalizedScore / 100)
                                }}
                              />
                              <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#FCD34D" />
                                  <stop offset="100%" stopColor="#F59E0B" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                                className="text-2xl font-bold text-yellow-300"
                              >
                                {personalizedScore}%
                              </motion.span>
                            </div>
                          </motion.div>
                          <p className="text-blue-200 text-sm">
                            Based on your skills, experience, and preferences
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Dynamic Filters */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <DynamicFilters
                  filters={filters}
                  setFilters={setFilters}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onFilterChange={setActiveFilters}
                />
              </motion.div>

              {/* Popular Categories */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    Popular Categories
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowTrends(!showTrends)}
                    className="gap-2 bg-white/80 backdrop-blur-sm"
                  >
                    <TrendingUp className="w-4 h-4" />
                    {showTrends ? 'Hide' : 'Show'} Trends
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.05,
                        boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.1)'
                      }}
                      className="relative group cursor-pointer"
                    >
                      <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6 text-center space-y-4">
                          <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <category.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {category.count.toLocaleString()} jobs
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Job Market Trends */}
              <AnimatePresence>
                {showTrends && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <JobMarketTrends />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Jobs Section Header */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Target className="w-8 h-8 text-blue-600" />
                    </motion.div>
                    {filteredJobs.length} Perfect Matches
                  </h2>
                  <p className="text-gray-600">
                    Ranked by AI compatibility • Updated 2 minutes ago
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    View:
                  </div>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="gap-2"
                    >
                      <Grid className="w-4 h-4" />
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="gap-2"
                    >
                      <List className="w-4 h-4" />
                      List
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Job Cards */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 lg:grid-cols-2 gap-6" 
                  : "space-y-4"
                }
              >
                <AnimatePresence>
                  {filteredJobs.map((job, index) => (
                    <EnhancedJobCard
                      key={job.id}
                      job={job}
                      index={index}
                      onSave={handleSave}
                      onLike={handleLike}
                      onJobClick={handleJobClick}
                      savedJobs={savedJobs}
                      likedJobs={likedJobs}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Load More */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="text-center pt-8"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5" />
                    Load More Amazing Jobs
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Jobs;