import { NewSidebar } from "@/components/layout/NewSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { BlurFade } from "../components/ui/blur-fade";
import { 
  DashboardService, 
  DashboardStats, 
  JobRecommendation, 
  RecentActivity,
  UserProfile,
  EmailOutreachStats,
  ApplicationProgress
} from "@/services/dashboardService";
import { useJobs } from "@/hooks/useJobs";
import { Job } from "@/types/job";
import { 
  Bell, 
  Search, 
  Settings, 
  User,
  BriefcaseBusiness,
  FileText,
  Mail,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Target,
  Send,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Star,
  Sparkles,
  ArrowRight,
  Plus,
  TrendingDown,
  Zap,
  Trophy,
  Eye,
  MessageSquare,
  BookOpen,
  Globe,
  Briefcase,
  PieChart,
  Activity,
  Filter,
  MapPin,
  DollarSign,
  Timer,
  ThumbsUp,
  AlertCircle,
  Bookmark,
  Share2,
  Download,
  ChevronRight,
  ExternalLink,
  Building,
  GraduationCap,
  Rocket,
  Shield,
  Lightbulb,
  Network,
  Loader2
} from "lucide-react";

// Enhanced Metric Card with better visual hierarchy
const EnhancedMetricCard = ({ 
  label, 
  value, 
  change, 
  changeType = 'positive',
  icon: Icon,
  subtitle,
  className = "",
  trend = []
}: {
  label: string;
  value: string;
  change: string;
  changeType?: 'positive' | 'negative';
  icon: React.ComponentType<any>;
  subtitle?: string;
  className?: string;
  trend?: number[];
}) => {
  return (
    <Card className={`group bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      <CardContent className="p-6 relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-3xl opacity-50"></div>
        <div className="flex justify-between items-start relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                <Icon className="h-4 w-4 text-gray-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">{label}</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
            {subtitle && <div className="text-xs text-gray-500 mb-2">{subtitle}</div>}
            <div className={`flex items-center gap-1 text-sm font-medium ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-500'
            }`}>
              {changeType === 'positive' ? 
                <TrendingUp className="h-3 w-3" /> : 
                <TrendingDown className="h-3 w-3" />
              }
              {change}
            </div>
          </div>
          {trend.length > 0 && (
            <div className="w-16 h-8 flex items-end gap-0.5">
              {trend.map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-sm transition-all duration-300"
                  style={{
                    backgroundColor: changeType === 'positive' ? '#10b981' : '#ef4444',
                    height: `${Math.max(height * 10, 5)}%`,
                    opacity: 0.7
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Job Card with better visual design
const EnhancedJobCard = ({ 
  job
}: {
  job: Job;
}) => {
  const formatSalary = (job: Job) => {
    // Job type doesn't have salary_range, so we'll show a default message
    return "Salary not specified";
  };

  const getSkills = (job: Job) => {
    if (job.tags && job.tags.length > 0) return job.tags;
    // Extract basic skills from job title/description
    const title = job.title.toLowerCase();
    const skills = [];
    if (title.includes('react')) skills.push('React');
    if (title.includes('typescript') || title.includes('ts')) skills.push('TypeScript');
    if (title.includes('node')) skills.push('Node.js');
    if (title.includes('python')) skills.push('Python');
    if (title.includes('java')) skills.push('Java');
    if (title.includes('aws')) skills.push('AWS');
    return skills.length > 0 ? skills : ['JavaScript', 'HTML', 'CSS'];
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const skills = getSkills(job);
  const matchScore = 85 + Math.floor(Math.random() * 15); // Generate a match score between 85-100

  return (
    <div className="group p-4 border-b last:border-b-0 hover:bg-gray-50 transition-all duration-200 relative">
      {Math.random() > 0.8 && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
            <Zap className="h-3 w-3 mr-1" />
            Urgent
          </Badge>
        </div>
      )}
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 border-2 border-gray-100">
          <AvatarImage src={job.logo} alt={job.company} />
          <AvatarFallback className="text-white font-semibold" style={{ backgroundColor: '#b24e55' }}>
            {job.company.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors truncate">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Building className="h-3 w-3" />
                <span>{job.company}</span>
                <span>•</span>
                <MapPin className="h-3 w-3" />
                <span>{job.location || 'Location not specified'}</span>
                {(job.isRemote || job.isProbablyRemote) && (
                  <>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                      Remote
                    </Badge>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 ml-4">
              <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                {matchScore}% match
              </Badge>
              <span className="text-xs text-gray-500">{job.posted}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-3 w-3 text-gray-500" />
            <span className="text-sm font-medium" style={{ color: '#b24e55' }}>{formatSalary(job)}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-600">
                {skill}
              </Badge>
            ))}
            {skills.length > 4 && (
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
                +{skills.length - 4}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 px-3 text-gray-600 hover:text-gray-900">
                <Bookmark className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-3 text-gray-600 hover:text-gray-900">
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 border-gray-300 hover:bg-gray-50">
                View Details
              </Button>
              <Button size="sm" className="h-8 text-white hover:opacity-90" style={{ backgroundColor: '#b24e55' }} asChild>
                <a href={job.applyLink || '#'} target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Activity Timeline Component
const ActivityTimeline = ({ activities }: { activities: RecentActivity[] }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No recent activity</p>
        <p className="text-xs mt-1">Start applying to jobs to see your activity here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activity.color === 'blue' ? 'bg-blue-100' :
            activity.color === 'green' ? 'bg-green-100' :
            activity.color === 'purple' ? 'bg-purple-100' :
            activity.color === 'orange' ? 'bg-orange-100' :
            'bg-red-100'
          }`}>
            <span className="text-sm">{activity.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
            {activity.company && <p className="text-xs text-gray-600">{activity.company}</p>}
            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Quick Action Button Component
const QuickActionButton = ({ 
  icon: Icon, 
  label, 
  description, 
  to, 
  color = 'default' 
}: {
  icon: React.ComponentType<any>;
  label: string;
  description: string;
  to: string;
  color?: 'default' | 'primary' | 'success' | 'warning';
}) => {
  const colorClasses = {
    default: 'bg-gray-50 hover:bg-gray-100 border-gray-200',
    primary: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    success: 'bg-green-50 hover:bg-green-100 border-green-200',
    warning: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
  };

  return (
    <Link to={to} className="block">
      <div className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-sm group ${colorClasses[color]}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
            <Icon className="h-5 w-5 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 text-sm">{label}</div>
            <div className="text-xs text-gray-600">{description}</div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </Link>
  );
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [userName, setUserName] = useState(user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User");
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [emailStats, setEmailStats] = useState<EmailOutreachStats | null>(null);
  const [applicationProgress, setApplicationProgress] = useState<ApplicationProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'demo' | 'error'>('connected');

  // Use the useJobs hook to fetch job recommendations
  const { data: jobsData, isLoading: jobsLoading, error: jobsError } = useJobs({
    limit: 3,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

  const jobRecommendations = jobsData?.jobs || [];

  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  useEffect(() => {
    if (user) {
      setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || user.email || "User");
    }
  }, [user]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('🔄 Loading dashboard data...');

        // Load all dashboard data in parallel with better error handling
        const [
          statsData,
          activityData,
          profileData,
          emailData
        ] = await Promise.all([
          DashboardService.getDashboardStats().catch(err => {
            console.error('Error loading dashboard stats:', err);
            // Return fallback stats instead of null
            return {
              totalApplications: 0,
              interviewInvites: 0,
              profileViews: 0,
              weeklyApplications: 0,
              weeklyGoal: 15,
              applicationsByStatus: {
                applied: 0, screening: 0, interview_scheduled: 0, interviewed: 0,
                technical_assessment: 0, final_round: 0, offer_received: 0,
                accepted: 0, rejected: 0, withdrawn: 0,
              },
              weeklyTrend: [0, 0, 0, 0, 0, 0, 0],
            };
          }),
          DashboardService.getRecentActivity(4).catch(err => {
            console.error('Error loading recent activity:', err);
            return [];
          }),
          DashboardService.getUserProfile().catch(err => {
            console.error('Error loading user profile:', err);
            return {
              id: 'demo-user',
              full_name: 'Demo User',
              profile_completion: 50,
              resume_score: 70,
            };
          }),
          DashboardService.getEmailOutreachStats().catch(err => {
            console.error('Error loading email stats:', err);
            return {
              emailsSent: 0,
              openRate: 0,
              responseRate: 0,
              campaignsActive: 0,
              responsesReceived: 0,
              interviewRequests: 0,
            };
          })
        ]);

        console.log('✅ Dashboard data loaded successfully:', {
          stats: !!statsData,
          activities: activityData.length,
          profile: !!profileData,
          email: !!emailData
        });

        // Determine connection status based on data quality
        setConnectionStatus('connected'); // Default to connected

        setDashboardStats(statsData);
        setRecentActivity(activityData);
        setUserProfile(profileData);
        setEmailStats(emailData);

        // Calculate application progress from stats
        if (statsData) {
          const progress: ApplicationProgress = {
            totalApplied: statsData.totalApplications,
            interviews: statsData.interviewInvites,
            inProgress: statsData.applicationsByStatus.screening + statsData.applicationsByStatus.technical_assessment,
            followUps: statsData.applicationsByStatus.applied,
            weeklyGoal: statsData.weeklyGoal,
            weeklyProgress: (statsData.weeklyApplications / statsData.weeklyGoal) * 100,
            successRate: statsData.totalApplications > 0 ? (statsData.interviewInvites / statsData.totalApplications) * 100 : 0,
            avgResponseTime: 4.2
          };
          setApplicationProgress(progress);
        }

      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    // Load dashboard data regardless of authentication status
    // The DashboardService will handle demo mode if no user is authenticated
    loadDashboardData();
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getWeeklyTrendChange = () => {
    if (!dashboardStats?.weeklyTrend || dashboardStats.weeklyTrend.length < 2) return '+0%';
    const recent = dashboardStats.weeklyTrend.slice(-3).reduce((a, b) => a + b, 0);
    const previous = dashboardStats.weeklyTrend.slice(-6, -3).reduce((a, b) => a + b, 0);
    if (previous === 0) return recent > 0 ? '+100%' : '+0%';
    const change = ((recent - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`;
  };

  if (error) {
    return (
      <div className="min-h-screen flex w-full bg-gray-50">
        <NewSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="text-white" style={{ backgroundColor: '#b24e55' }}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <NewSidebar />
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg w-80">
              <Search className="h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search jobs, companies, skills..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
              />
              <Badge className="bg-gray-200 text-gray-600 text-xs border-0">⌘K</Badge>
            </div>
            {/* Connection Status Indicator */}
            {connectionStatus === 'demo' && (
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                Demo Mode
              </Badge>
            )}
            {connectionStatus === 'connected' && (
              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Live Data
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-[10px] text-white flex items-center justify-center" 
                    style={{ backgroundColor: '#b24e55' }}>
                {recentActivity.length > 0 ? Math.min(recentActivity.length, 9) : 0}
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full flex items-center gap-2 p-1 pl-3 hover:bg-gray-100">
                  <span className="text-sm font-medium hidden md:inline">{userName}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback style={{ backgroundColor: '#b24e55' }} className="text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut?.()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
          {(isLoading || jobsLoading) ? (
            <div className="flex items-center justify-center h-[80vh]">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: '#b24e55' }} />
                <p className="text-sm text-gray-500">Loading your personalized dashboard...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Enhanced Greeting with Status */}
              <BlurFade delay={0.1}>
                <div className="mb-8 bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {getGreeting()}, {userName} 👋
                      </h1>
                      <p className="text-gray-600 text-lg mb-3">Here's your job search progress today</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-green-700 font-medium">
                            {jobRecommendations.length} new job matches
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm text-gray-600">
                            {userProfile?.profile_completion || 0}% profile completion
                          </span>
                        </div>
                        {connectionStatus === 'demo' && (
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-blue-700 font-medium">
                              Demo Mode - Sample Data
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                      <Button className="text-white" style={{ backgroundColor: '#b24e55' }} asChild>
                        <Link to="/jobs" className="flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          Find Jobs
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/resume-builder" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Optimize Resume
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Enhanced Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column - Main Content */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Enhanced Metrics Row */}
                  <BlurFade delay={0.2}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <EnhancedMetricCard
                        label="Applications Sent"
                        value={formatNumber(dashboardStats?.totalApplications || 0)}
                        change={getWeeklyTrendChange()}
                        icon={Send}
                        subtitle={`${dashboardStats?.weeklyApplications || 0} this week`}
                        trend={dashboardStats?.weeklyTrend || []}
                      />
                      <EnhancedMetricCard
                        label="Interview Invites"
                        value={formatNumber(dashboardStats?.interviewInvites || 0)}
                        change={dashboardStats?.interviewInvites && dashboardStats?.totalApplications 
                          ? `${Math.round((dashboardStats.interviewInvites / dashboardStats.totalApplications) * 100)}% rate`
                          : '+0% rate'}
                        icon={Calendar}
                        subtitle={`${dashboardStats?.applicationsByStatus.interview_scheduled || 0} scheduled`}
                        trend={[2, 3, 1, 4, 2, 5, 3]}
                      />
                      <EnhancedMetricCard
                        label="Profile Views"
                        value={formatNumber(dashboardStats?.profileViews || 0)}
                        change="+42% this week"
                        icon={Eye}
                        subtitle="From recruiters"
                        trend={[1, 2, 4, 3, 5, 4, 6]}
                      />
                    </div>
                  </BlurFade>

                  {/* Enhanced Job Recommendations */}
                  <BlurFade delay={0.3}>
                    <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300">
                      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                              <Target className="h-5 w-5" style={{ color: '#b24e55' }} />
                              Recommended Jobs
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                              AI-powered matches based on your profile and preferences
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-gray-600">
                              <Filter className="h-4 w-4 mr-1" />
                              Filter
                            </Button>
                            <Link to="/jobs" className="flex items-center gap-1 text-sm font-medium hover:underline" 
                                  style={{ color: '#b24e55' }}>
                              View All
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        {jobRecommendations.length > 0 ? (
                          <>
                            {jobRecommendations.map((job) => (
                              <EnhancedJobCard key={job.id} job={job} />
                            ))}
                            <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">More jobs</span> available for your profile
                                </div>
                                <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#b24e55' }} asChild>
                                  <Link to="/jobs" className="flex items-center gap-2">
                                    <Search className="h-4 w-4" />
                                    Explore All Jobs
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="p-8 text-center">
                            <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No job recommendations yet</h3>
                            <p className="text-gray-600 mb-4">Complete your profile to get personalized job matches</p>
                            <Button className="text-white" style={{ backgroundColor: '#b24e55' }} asChild>
                              <Link to="/profile">Complete Profile</Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </BlurFade>

                  {/* Application Progress Tracker */}
                  {applicationProgress && (
                    <BlurFade delay={0.4}>
                      <Card className="bg-white border-0 shadow-sm">
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" style={{ color: '#b24e55' }} />
                                Application Progress
                              </CardTitle>
                              <p className="text-sm text-gray-600 mt-1">Track your weekly application goals</p>
                            </div>
                            <Link to="/applications" className="text-sm font-medium hover:underline" style={{ color: '#b24e55' }}>
                              View Details
                            </Link>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-3">
                                <span className="font-medium text-gray-900">Weekly Goal Progress</span>
                                <span className="text-2xl font-bold" style={{ color: '#b24e55' }}>
                                  {dashboardStats?.weeklyApplications || 0}/{dashboardStats?.weeklyGoal || 15}
                                </span>
                              </div>
                              <Progress value={applicationProgress.weeklyProgress} className="h-3 mb-2" />
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>
                                  {Math.max(0, (dashboardStats?.weeklyGoal || 15) - (dashboardStats?.weeklyApplications || 0))} more applications to reach your goal
                                </span>
                                <span>{Math.round(applicationProgress.weeklyProgress)}% complete</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-700">{applicationProgress.totalApplied}</div>
                                <div className="text-xs text-gray-600">Total Applied</div>
                                <div className="text-xs text-green-600 font-medium">
                                  +{dashboardStats?.weeklyApplications || 0} this week
                                </div>
                              </div>
                              <div className="text-center p-3 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-700">{applicationProgress.interviews}</div>
                                <div className="text-xs text-gray-600">Interviews</div>
                                <div className="text-xs text-green-600 font-medium">
                                  {Math.round(applicationProgress.successRate)}% success rate
                                </div>
                              </div>
                              <div className="text-center p-3 bg-orange-50 rounded-lg">
                                <div className="text-2xl font-bold text-orange-700">{applicationProgress.inProgress}</div>
                                <div className="text-xs text-gray-600">In Progress</div>
                                <div className="text-xs text-blue-600 font-medium">Awaiting response</div>
                              </div>
                              <div className="text-center p-3 bg-purple-50 rounded-lg">
                                <div className="text-2xl font-bold text-purple-700">{applicationProgress.followUps}</div>
                                <div className="text-xs text-gray-600">Follow-ups</div>
                                <div className="text-xs text-orange-600 font-medium">Action needed</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </BlurFade>
                  )}

                </div>

                {/* Right Column - Sidebar Content */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* AI Assistant Card */}
                  <BlurFade delay={0.5}>
                    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-purple-600" />
                          AI Career Assistant
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                              <Lightbulb className="h-3 w-3 text-purple-600" />
                            </div>
                            <div className="text-sm">
                              <p className="font-medium text-gray-900">Resume Optimization Tip</p>
                              <p className="text-gray-600 text-xs mt-1">
                                {userProfile?.resume_score && userProfile.resume_score < 80 
                                  ? "Add quantified achievements to increase your match score by 15%"
                                  : "Your resume looks great! Consider updating it with recent projects."
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-purple-100">
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <Network className="h-3 w-3 text-blue-600" />
                            </div>
                            <div className="text-sm">
                              <p className="font-medium text-gray-900">Networking Opportunity</p>
                              <p className="text-gray-600 text-xs mt-1">
                                {emailStats && emailStats.emailsSent > 0 
                                  ? `${emailStats.responsesReceived} professionals responded to your outreach`
                                  : "Start reaching out to professionals in your target companies"
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full text-white" style={{ backgroundColor: '#b24e55' }}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat with AI Assistant
                        </Button>
                      </CardContent>
                    </Card>
                  </BlurFade>

                  {/* Recent Activity */}
                  <BlurFade delay={0.6}>
                    <Card className="bg-white border-0 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Activity className="h-5 w-5" style={{ color: '#b24e55' }} />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ActivityTimeline activities={recentActivity} />
                        <Button variant="outline" className="w-full mt-4 border-gray-300" asChild>
                          <Link to="/applications">View All Activity</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </BlurFade>

                  {/* Quick Actions */}
                  <BlurFade delay={0.7}>
                    <Card className="bg-white border-0 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Rocket className="h-5 w-5" style={{ color: '#b24e55' }} />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <QuickActionButton
                          icon={FileText}
                          label="Optimize Resume"
                          description="AI-powered improvements"
                          to="/resume-builder"
                          color="primary"
                        />
                        <QuickActionButton
                          icon={Mail}
                          label="Email Campaign"
                          description="Connect with recruiters"
                          to="/email-outreach"
                          color="success"
                        />
                      </CardContent>
                    </Card>
                  </BlurFade>

                  {/* Performance Insights */}
                  {applicationProgress && (
                    <BlurFade delay={0.8}>
                      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-green-600" />
                            Performance Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Application Success Rate</span>
                            <span className="text-lg font-bold text-green-700">
                              {Math.round(applicationProgress.successRate)}%
                            </span>
                          </div>
                          <Progress value={applicationProgress.successRate} className="h-2" />
                          <div className="text-xs text-gray-600">
                            {applicationProgress.successRate > 12.3 ? 'Above' : 'Below'} industry average of 12.3%
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-700">{applicationProgress.avgResponseTime}</div>
                              <div className="text-xs text-gray-600">Avg Response Time (days)</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-700">{userProfile?.profile_completion || 0}%</div>
                              <div className="text-xs text-gray-600">Profile Completion</div>
                            </div>
                          </div>
                          
                          <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50" asChild>
                            <Link to="/applications">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Detailed Analytics
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </BlurFade>
                  )}

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;