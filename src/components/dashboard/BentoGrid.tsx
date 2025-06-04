
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Calendar,
  Clock,
  Users,
  Target,
  BookOpen,
  MessageSquare,
  Bell,
  ArrowRight,
  Star,
  CheckCircle
} from "lucide-react";

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
      {/* Quick Actions - Large */}
      <Card className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/jobs">
              <Button className="w-full h-16 flex flex-col gap-1 bg-blue-600 hover:bg-blue-700">
                <span className="font-medium">Find Jobs</span>
                <span className="text-xs opacity-90">Browse 1,234 openings</span>
              </Button>
            </Link>
            <Link to="/resume-editor">
              <Button variant="outline" className="w-full h-16 flex flex-col gap-1 border-blue-200 hover:bg-blue-50">
                <span className="font-medium">Build Resume</span>
                <span className="text-xs text-muted-foreground">AI-powered editor</span>
              </Button>
            </Link>
            <Link to="/interview-prep">
              <Button variant="outline" className="w-full h-16 flex flex-col gap-1 border-blue-200 hover:bg-blue-50">
                <span className="font-medium">Interview Prep</span>
                <span className="text-xs text-muted-foreground">Practice sessions</span>
              </Button>
            </Link>
            <Link to="/skills">
              <Button variant="outline" className="w-full h-16 flex flex-col gap-1 border-blue-200 hover:bg-blue-50">
                <span className="font-medium">Skill Test</span>
                <span className="text-xs text-muted-foreground">Assess abilities</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Application Progress */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Application Progress
            </span>
            <Link to="/applications">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Applications This Week</span>
              <span className="font-medium">7/10</span>
            </div>
            <Progress value={70} className="h-2" />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">27</div>
              <div className="text-xs text-muted-foreground">Applied</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-xs text-muted-foreground">Interviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="text-xs text-muted-foreground">AI Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
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

      {/* Learning Recommendations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
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
          <div className="space-y-2">
            <div className="text-sm font-medium">System Design Basics</div>
            <Progress value={30} className="h-1" />
            <div className="text-xs text-muted-foreground">30% complete</div>
          </div>
          <Link to="/learning">
            <Button variant="outline" size="sm" className="w-full">
              Browse Courses
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4 text-green-600" />
            Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=center" />
              <AvatarFallback>HR</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">TechFlow HR</div>
              <div className="text-xs text-muted-foreground truncate">Interview confirmation...</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b932?w=60&h=60&fit=crop&crop=center" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">AI Assistant</div>
              <div className="text-xs text-muted-foreground truncate">New job matches found...</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            View All Messages
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4 text-red-600" />
              Notifications
            </span>
            <Badge variant="destructive" className="text-xs">3</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-2 rounded-lg bg-red-50 border border-red-200">
            <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Interview Tomorrow</div>
              <div className="text-xs text-muted-foreground">Don't forget your 2 PM interview</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-2 rounded-lg bg-blue-50 border border-blue-200">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">New Job Matches</div>
              <div className="text-xs text-muted-foreground">5 new positions match your profile</div>
            </div>
          </div>
          <Link to="/notifications">
            <Button variant="outline" size="sm" className="w-full">
              View All
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Top Job Recommendations - Large */}
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Top Job Matches
            </span>
            <Link to="/jobs">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <img
                src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=60&h=60&fit=crop&crop=center"
                alt="TechFlow"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="font-medium">Senior Frontend Developer</div>
                <div className="text-sm text-muted-foreground">TechFlow Inc • San Francisco, CA</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">React</Badge>
                  <Badge variant="outline" className="text-xs">TypeScript</Badge>
                  <span className="text-xs text-green-600 font-medium">96% match</span>
                </div>
              </div>
              <Button size="sm">Apply</Button>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center"
                alt="StartupXYZ"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="font-medium">Full Stack Engineer</div>
                <div className="text-sm text-muted-foreground">StartupXYZ • Remote</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">Node.js</Badge>
                  <Badge variant="outline" className="text-xs">React</Badge>
                  <span className="text-xs text-green-600 font-medium">92% match</span>
                </div>
              </div>
              <Button size="sm">Apply</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Progress */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              Skill Development
            </span>
            <Link to="/skills">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>System Design</span>
                <span className="font-medium">Beginner</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </div>
          <div className="text-center pt-2">
            <Link to="/skills">
              <Button variant="outline" size="sm">
                Take Skill Assessment
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BentoGrid;
