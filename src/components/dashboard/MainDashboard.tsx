import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  CheckCircle,
  CircleCheck,
  CircleDashed,
  Clock,
  FileText,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Plus,
  Search,
  Star,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatCard } from "./StatCard";
import { RecommendedJobCard } from "./RecommendedJobCard";
import { AnalyticsChart, BarChart, LineChart, PieChart } from "./AnalyticsChart";
import { TaskWidget } from "./TaskWidget";
import { MarketInsights } from "./MarketInsights";

export const MainDashboard = () => {
  return (
    <div>
      

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Column 1 and 2 (Job Board) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Board */}
          <Card className="overflow-hidden border-0 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Job Opportunities</CardTitle>
                  <CardDescription>Recommended based on your profile</CardDescription>
                </div>
                <Link to="/jobs" className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
                  <span>View all</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <RecommendedJobCard
                  title="Senior Frontend Developer"
                  company="TechFlow Inc"
                  logo="T"
                  logoColor="bg-blue-100 text-blue-600"
                  location="San Francisco, CA"
                  salary="$120K - $160K"
                  postedTime="2 days ago"
                  matchScore={96}
                  skills={["React", "TypeScript", "Next.js"]}
                />
                <RecommendedJobCard
                  title="Full Stack Engineer"
                  company="StartupXYZ"
                  logo="S"
                  logoColor="bg-purple-100 text-purple-600"
                  location="Remote"
                  salary="$100K - $140K"
                  postedTime="3 days ago"
                  matchScore={92}
                  skills={["Node.js", "React", "AWS"]}
                />
                <RecommendedJobCard
                  title="Frontend Developer"
                  company="GrowthTech"
                  logo="G"
                  logoColor="bg-green-100 text-green-600"
                  location="Austin, TX"
                  salary="$90K - $120K" 
                  postedTime="1 day ago"
                  matchScore={88}
                  skills={["JavaScript", "React", "CSS"]}
                />
              </div>
              <div className="p-4 bg-gray-50 flex justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link to="/jobs" className="flex items-center gap-1.5">
                    <Search className="h-4 w-4" />
                    Find More Jobs
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Application Tracker */}
          <Card className="overflow-hidden border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Application Tracker</CardTitle>
                <CardDescription>Progress towards your goals</CardDescription>
              </div>
              <Link to="/applications" className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
                <span>View all</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center mb-6">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">Weekly Application Goal</span>
                    <span className="font-medium">7/10</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1.5">
                    <span>3 more to reach goal</span>
                    <span>70% complete</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/applications">
                      Add Application
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">27</div>
                  <div className="text-xs text-gray-600">Total Applied</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">4</div>
                  <div className="text-xs text-gray-600">Interviews</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-700">12</div>
                  <div className="text-xs text-gray-600">In Progress</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-700">6</div>
                  <div className="text-xs text-gray-600">Follow-ups</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 3 (Side Widgets) */}
          <div className="space-y-6">
            {/* Resume Score Card */}
            <Card className="overflow-hidden border-0 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b pb-3">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-600" />
                  Resume Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-indigo-700">85%</span>
                  </div>
                  <div className="flex-1 ml-4">
                    <h4 className="font-medium text-sm">Resume Score</h4>
                    <p className="text-xs text-gray-500 mt-1">Your resume outperforms 75% of applicants in your field</p>
                  </div>
                </div>
              
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                     <div>
                      <div className="text-sm font-medium">Strong work experience</div>
                      <div className="text-xs text-gray-500">Clear project descriptions with metrics</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CircleDashed className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Skills section needs work</div>
                      <div className="text-xs text-gray-500">Add more industry-specific keywords</div>
                    </div>
                  </div>
                </div>
              
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                  <Link to="/resume-builder">
                    Optimize Resume
                  </Link>
                </Button>
              </CardContent>
            </Card>
          
            {/* Task Widget - Upcoming Schedule */}
            <TaskWidget
              tasks={[
                {
                  id: "1",
                  title: "TechFlow Interview",
                  description: "Technical interview with senior developer",
                  date: "Today",
                  time: "2:00 PM - 3:00 PM",
                  status: "upcoming",
                  type: "interview"
                },
                {
                  id: "2",
                  title: "Networking Event",
                  description: "Tech industry networking meetup",
                  date: "Today",
                  time: "6:00 PM - 8:00 PM",
                  status: "upcoming",
                  type: "task"
                },
                {
                  id: "3",
                  title: "Follow up with StartupXYZ",
                  date: "Tomorrow",
                  status: "upcoming",
                  type: "followup"
                },
                {
                  id: "4",
                  title: "Apply to GrowthTech",
                  date: "Thursday",
                  status: "upcoming",
                  type: "application"
                }
              ]}
              title="Upcoming Schedule"
              description="Your calendar for the week"
            />
          
          {/* Skills Progress */}
          <Card className="overflow-hidden border-0 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b pb-3">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-green-600" />
                Skills Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">React</span>
                  <span>Advanced</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">TypeScript</span>
                  <span>Intermediate</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">System Design</span>
                  <span>Beginner</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/skills">
                  View All Skills
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tasks & Applications Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TaskWidget
            tasks={[
              {
                id: "5",
                title: "Submit application to DataSys",
                date: "Friday",
                status: "upcoming",
                type: "application"
              },
              {
                id: "6",
                title: "Update LinkedIn profile",
                date: "Saturday",
                status: "upcoming",
                type: "task"
              }
            ]}
            title="Action Items"
            description="Tasks to complete this week"
            maxItems={2}
          />
          
          <Card className="overflow-hidden border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Application Status</CardTitle>
              <CardDescription>Track your job applications</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-blue-700">12</div>
                  <div className="text-xs text-gray-600">In Review</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-amber-700">8</div>
                  <div className="text-xs text-gray-600">Pending</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-green-700">4</div>
                  <div className="text-xs text-gray-600">Interviews</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-red-700">3</div>
                  <div className="text-xs text-gray-600">Rejected</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/applications">View All Applications</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Analytics Overview</h2>
          <Link to="/analytics" className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
            View detailed analytics
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnalyticsChart 
            title="Application Trends" 
            icon={<BarChart3 className="h-4 w-4 text-blue-600" />}
            link={{ text: "Details", to: "/analytics" }}
          >
            <BarChart 
              data={[
                { label: "Mon", value: 3, color: "bg-blue-500" },
                { label: "Tue", value: 7, color: "bg-blue-500" },
                { label: "Wed", value: 5, color: "bg-blue-500" },
                { label: "Thu", value: 8, color: "bg-blue-500" },
                { label: "Fri", value: 4, color: "bg-blue-500" },
                { label: "Sat", value: 2, color: "bg-blue-500" },
                { label: "Sun", value: 1, color: "bg-blue-500" }
              ]}
              maxValue={10}
              height={180}
            />
          </AnalyticsChart>
          
          <AnalyticsChart 
            title="Response Rate" 
            icon={<LineChartIcon className="h-4 w-4 text-green-600" />}
          >
            <LineChart 
              data={[
                { value: 25 },
                { value: 32 },
                { value: 28 },
                { value: 35 },
                { value: 40 },
                { value: 38 },
                { value: 50 }
              ]}
              color="#16a34a"
            />
          </AnalyticsChart>
          
          <AnalyticsChart 
            title="Job Types" 
            icon={<PieChartIcon className="h-4 w-4 text-purple-600" />}
          >
            <PieChart 
              data={[
                { label: "Remote", value: 65, color: "#8b5cf6" },
                { label: "Hybrid", value: 25, color: "#3b82f6" },
                { label: "On-site", value: 10, color: "#f59e0b" }
              ]}
            />
          </AnalyticsChart>
        </div>
      </section>
      
      {/* Market Insights Section */}
      <section className="mb-8">
        <MarketInsights
          insights={[
            {
              title: "Average Salary",
              value: "$125,000",
              change: {
                value: "+5%",
                isPositive: true,
                description: "from last quarter"
              },
              category: "Frontend"
            },
            {
              title: "Most In-Demand Skill",
              value: "React",
              change: {
                value: "+12%",
                isPositive: true,
                description: "YoY growth"
              }
            },
            {
              title: "Interview Success Rate",
              value: "34%",
              change: {
                value: "+8%",
                isPositive: true,
                description: "industry average"
              }
            }
          ]}
        />
      </section>
    </div>
  );
};

// Legacy compatibility components
export const QuickStatCard = ({ title, value, trend, icon, color }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="mt-2 text-xs text-green-600">
          {trend} this week
        </div>
      </CardContent>
    </Card>
  );
};

export const JobCard = ({ title, company, location, match }) => {
  return (
    <div className="p-2 border rounded-lg bg-white flex items-center justify-between">
      <div className="flex-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-gray-600">{company} • {location}</div>
      </div>
      <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
        {match}% match
      </Badge>
    </div>
  );
};

export const ExtendedJobCard = ({ title, company, location, salary, match, skills }) => {
  return (
    <div className="p-3 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{company}</p>
          <p className="text-xs text-gray-500">{location} • {salary}</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          {match}% match
        </Badge>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <Button size="sm" className="flex-1">
          Apply
        </Button>
        <Button size="sm" variant="outline">
          Save
        </Button>
      </div>
    </div>
  );
};

export const AnalyticsStat = ({ label, value, trend, icon }) => {
  return (
    <div className="bg-slate-50 p-2 rounded-lg border">
      <div className="flex items-center gap-1 mb-1">
        {icon}
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-xs text-green-600">{trend}</div>
    </div>
  );
};