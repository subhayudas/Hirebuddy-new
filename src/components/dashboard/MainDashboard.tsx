import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  LineChart,
  PieChart,
  Search,
  Star,
  TrendingUp,
  Users
} from "lucide-react";

export const MainDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Main Dashboard Navigation Tabs */}
      <Tabs defaultValue="main" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="main">Main</TabsTrigger>
          <TabsTrigger value="job-search">Job Search</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
        </TabsList>

        {/* Main Dashboard Tab */}
        <TabsContent value="main" className="mt-4 space-y-6">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickStatCard 
              title="Applied" 
              value="27" 
              trend="+5" 
              icon={<BriefcaseBusiness className="h-4 w-4 text-blue-600" />} 
              color="text-blue-600" 
            />
            <QuickStatCard 
              title="Interviews" 
              value="4" 
              trend="+2" 
              icon={<Users className="h-4 w-4 text-green-600" />} 
              color="text-green-600" 
            />
            <QuickStatCard 
              title="Match Score" 
              value="94%" 
              trend="+3%" 
              icon={<Star className="h-4 w-4 text-amber-600" />} 
              color="text-amber-600" 
            />
            <QuickStatCard 
              title="Response Rate" 
              value="32%" 
              trend="+8%" 
              icon={<TrendingUp className="h-4 w-4 text-purple-600" />} 
              color="text-purple-600" 
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Job Search Widget - Left Column */}
            <div className="space-y-6 md:col-span-2">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Job Search & Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Weekly Goal</span>
                        <span className="font-medium">7/10</span>
                      </div>
                      <Progress value={70} className="h-2" />
                      <div className="text-xs text-gray-500">
                        Send 3 more applications to reach your goal
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-blue-100">
                        <div className="text-xl font-bold text-blue-600 mb-1">27</div>
                        <div className="text-xs text-gray-600">Total Applied</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-100">
                        <div className="text-xl font-bold text-green-600 mb-1">4</div>
                        <div className="text-xs text-gray-600">Interviews</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Top Recommended Jobs</div>
                    <div className="space-y-2">
                      <JobCard
                        title="Senior Frontend Developer"
                        company="TechFlow Inc"
                        location="San Francisco, CA"
                        match={96}
                      />
                      <JobCard
                        title="Full Stack Engineer"
                        company="StartupXYZ"
                        location="Remote"
                        match={92}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Button variant="outline" className="flex-1 border-blue-200" asChild>
                      <Link to="/applications">
                        Track Applications
                      </Link>
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" asChild>
                      <Link to="/jobs">
                        Find Jobs
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Snapshot */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Analytics Snapshot</CardTitle>
                  <Link to="/analytics" className="text-sm text-blue-600 flex items-center gap-1">
                    <span>View Analytics</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="h-[180px] bg-slate-100 rounded-lg p-4 flex items-center justify-center relative overflow-hidden">
                    {/* This would be a chart in a real implementation */}
                    <div className="absolute inset-0 flex">
                      <div className="h-full w-1/3 flex flex-col justify-end px-1">
                        <div className="h-[30%] bg-blue-500 rounded-t-sm"></div>
                      </div>
                      <div className="h-full w-1/3 flex flex-col justify-end px-1">
                        <div className="h-[45%] bg-blue-500 rounded-t-sm"></div>
                      </div>
                      <div className="h-full w-1/3 flex flex-col justify-end px-1">
                        <div className="h-[80%] bg-blue-500 rounded-t-sm"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-800">Job Search Trends</span>
                      </div>
                      <div className="text-sm text-gray-600 flex gap-2">
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                          Applications
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                          Responses
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <AnalyticsStat 
                      label="Success Rate" 
                      value="34%" 
                      trend="+8%" 
                      icon={<LineChart className="h-4 w-4 text-green-600" />} 
                    />
                    <AnalyticsStat 
                      label="Average Response" 
                      value="5.2d" 
                      trend="-1.3d" 
                      icon={<Clock className="h-4 w-4 text-blue-600" />} 
                    />
                    <AnalyticsStat 
                      label="Top Job Type" 
                      value="Remote" 
                      trend="38%" 
                      icon={<PieChart className="h-4 w-4 text-purple-600" />} 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Resume Builder Widget */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Resume & Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-3 rounded-lg border border-green-100 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Resume Strength</div>
                      <div className="flex items-center mt-1">
                        <Progress value={85} className="h-2" />
                        <span className="ml-2 text-sm font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-green-100">
                    <div className="text-sm font-medium mb-2">Top Skills</div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="bg-gray-50">React</Badge>
                      <Badge variant="outline" className="bg-gray-50">TypeScript</Badge>
                      <Badge variant="outline" className="bg-gray-50">JavaScript</Badge>
                      <Badge variant="outline" className="bg-gray-50">Node.js</Badge>
                      <Badge variant="outline" className="bg-gray-50">CSS</Badge>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Optimizing your resume for ATS systems can increase your interview chances by 70%.
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link to="/resume-editor">
                      Optimize Resume
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Today's Schedule */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-orange-50 border border-orange-200">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">TechFlow Interview</div>
                      <div className="text-xs text-muted-foreground">2:00 PM - 3:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <Users className="h-4 w-4 text-blue-600" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Networking Event</div>
                      <div className="text-xs text-muted-foreground">6:00 PM - 8:00 PM</div>
                    </div>
                  </div>
                  <Link to="/calendar">
                    <Button variant="outline" size="sm" className="w-full">
                      View Calendar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Learning & Skills */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    Learn & Grow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">React Advanced Patterns</div>
                    <Progress value={65} className="h-1" />
                    <div className="text-xs text-muted-foreground">65% complete</div>
                  </div>
                  <Link to="/learning">
                    <Button variant="outline" size="sm" className="w-full">
                      Browse Courses
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Job Search Tab */}
        <TabsContent value="job-search" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Job Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input 
                      type="text" 
                      className="w-full pl-9 pr-4 py-2 border rounded-md" 
                      placeholder="Job title, skills, or company"
                    />
                  </div>
                  <div className="flex-1">
                    <select className="w-full p-2 border rounded-md">
                      <option>All Locations</option>
                      <option>Remote</option>
                      <option>San Francisco, CA</option>
                      <option>New York, NY</option>
                      <option>Austin, TX</option>
                    </select>
                  </div>
                  <Button className="shrink-0">
                    Find Jobs
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Top Matches for You</h3>
                    <div className="space-y-3">
                      <ExtendedJobCard
                        title="Senior Frontend Developer"
                        company="TechFlow Inc"
                        location="San Francisco, CA"
                        salary="$120k - $160k"
                        match={96}
                        skills={["React", "TypeScript", "Next.js"]}
                      />
                      <ExtendedJobCard
                        title="Full Stack Engineer"
                        company="StartupXYZ"
                        location="Remote"
                        salary="$100k - $140k"
                        match={92}
                        skills={["Node.js", "React", "AWS"]}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Recently Added</h3>
                    <div className="space-y-3">
                      <ExtendedJobCard
                        title="React Developer"
                        company="DigitalCorp"
                        location="New York, NY"
                        salary="$90k - $130k"
                        match={89}
                        skills={["React", "Redux", "GraphQL"]}
                      />
                      <ExtendedJobCard
                        title="Frontend Engineer"
                        company="TechSolutions"
                        location="Remote"
                        salary="$110k - $145k"
                        match={87}
                        skills={["JavaScript", "Vue.js", "CSS"]}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-2">
                  <Button variant="outline" asChild>
                    <Link to="/jobs">View All Job Matches</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Application Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">27</div>
                    <div className="text-xs text-gray-600">Total Applied</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">4</div>
                    <div className="text-xs text-gray-600">Interviews</div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-600">34%</div>
                    <div className="text-xs text-gray-600">Response Rate</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">6</div>
                    <div className="text-xs text-gray-600">Saved Jobs</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/applications">View Application History</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Average Salary</span>
                    <Badge variant="outline" className="text-xs">Frontend</Badge>
                  </div>
                  <div className="text-xl font-bold text-gray-900">$125,000</div>
                  <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>+5% from last quarter</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/analytics">View Market Insights</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Resume Tab */}
        <TabsContent value="resume" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Builder & Optimizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div className="font-medium">MyResume.pdf</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>ATS Compatibility</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between text-sm">
                        <span>Keyword Optimization</span>
                        <span className="font-medium">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">AI Improvement Suggestions</h3>
                    <div className="p-3 border rounded-lg flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <div className="text-sm">Add more specific metrics to your work accomplishments</div>
                    </div>
                    <div className="p-3 border rounded-lg flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <div className="text-sm">Optimize skills section with keywords from job descriptions</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium mb-3">Resume Templates</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border rounded p-2 hover:border-blue-400 cursor-pointer">
                        <div className="h-24 bg-blue-50 rounded mb-2"></div>
                        <div className="text-xs font-medium">Professional</div>
                      </div>
                      <div className="border rounded p-2 hover:border-blue-400 cursor-pointer">
                        <div className="h-24 bg-green-50 rounded mb-2"></div>
                        <div className="text-xs font-medium">Creative</div>
                      </div>
                      <div className="border rounded p-2 hover:border-blue-400 cursor-pointer">
                        <div className="h-24 bg-purple-50 rounded mb-2"></div>
                        <div className="text-xs font-medium">Modern</div>
                      </div>
                      <div className="border rounded p-2 hover:border-blue-400 cursor-pointer">
                        <div className="h-24 bg-gray-50 rounded mb-2"></div>
                        <div className="text-xs font-medium">Simple</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/resume-editor">Edit Resume</Link>
                    </Button>
                    <Button className="flex-1" asChild>
                      <Link to="/resume-editor">Create New</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Skills Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>React</span>
                      <span className="font-medium">Expert</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>TypeScript</span>
                      <span className="font-medium">Advanced</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Node.js</span>
                      <span className="font-medium">Intermediate</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
                
                <div className="flex flex-col justify-between gap-4">
                  <div className="p-3 border rounded-lg bg-blue-50">
                    <h3 className="text-sm font-medium mb-2">Skill Gap Analysis</h3>
                    <p className="text-sm text-gray-600">
                      Based on your target job roles, we recommend developing these skills:
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline" className="bg-white">Next.js</Badge>
                      <Badge variant="outline" className="bg-white">GraphQL</Badge>
                      <Badge variant="outline" className="bg-white">AWS</Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" asChild>
                    <Link to="/skills">Take Skill Assessment</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Component for each quick stat card
const QuickStatCard = ({ title, value, trend, icon, color }) => {
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

// Component for simple job card
const JobCard = ({ title, company, location, match }) => {
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

// Component for extended job card
const ExtendedJobCard = ({ title, company, location, salary, match, skills }) => {
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

// Component for analytics stat
const AnalyticsStat = ({ label, value, trend, icon }) => {
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