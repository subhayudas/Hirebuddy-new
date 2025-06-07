
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Play, Target, Trophy, Clock, Star } from "lucide-react";

export const InterviewDashboard = () => {
  const upcomingInterviews = [
    {
      company: "TechFlow Inc",
      position: "Senior Frontend Developer",
      date: "Today, 2:00 PM",
      type: "Technical",
      status: "confirmed"
    },
    {
      company: "StartupXYZ", 
      position: "Full Stack Engineer",
      date: "Tomorrow, 10:00 AM",
      type: "Behavioral",
      status: "pending"
    }
  ];

  const practiceStats = [
    { label: "Sessions Completed", value: 24, icon: Play, color: "text-primary" },
    { label: "Average Score", value: "85%", icon: Star, color: "text-primary" },
    { label: "Time Practiced", value: "12h", icon: Clock, color: "text-primary" },
    { label: "Skills Improved", value: 8, icon: Target, color: "text-primary" }
  ];

  return (
    <div className="space-y-6">
      {/* Practice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {practiceStats.map((stat, index) => (
          <Card key={index} className="border-pink-100 hover:shadow-md transition-shadow">
            <CardContent className="p-6 bg-gradient-to-r from-pink-50 to-pink-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interviews */}
        <Card className="border-pink-100">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 border-b">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingInterviews.map((interview, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-pink-50/50 rounded-lg hover:bg-pink-50 transition-colors">
                <div>
                  <h4 className="font-medium">{interview.company}</h4>
                  <p className="text-sm text-gray-600">{interview.position}</p>
                  <p className="text-sm text-gray-500">{interview.date}</p>
                  <Badge variant="outline" className="mt-1 border-pink-200 text-primary">{interview.type}</Badge>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Prepare
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full hover:bg-pink-50 border-pink-200 text-primary">
              View All Interviews
            </Button>
          </CardContent>
        </Card>

        {/* Quick Practice */}
        <Card className="border-pink-100">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 border-b">
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              Quick Practice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button className="w-full justify-start hover:bg-pink-50 border-pink-200" variant="outline">
                <Target className="h-4 w-4 mr-2 text-primary" />
                Behavioral Questions (15 min)
              </Button>
              <Button className="w-full justify-start hover:bg-pink-50 border-pink-200" variant="outline">
                <Target className="h-4 w-4 mr-2 text-primary" />
                Technical Coding (30 min)
              </Button>
              <Button className="w-full justify-start hover:bg-pink-50 border-pink-200" variant="outline">
                <Target className="h-4 w-4 mr-2 text-primary" />
                System Design (45 min)
              </Button>
              <Button className="w-full justify-start hover:bg-pink-50 border-pink-200" variant="outline">
                <Target className="h-4 w-4 mr-2 text-primary" />
                Company Research (20 min)
              </Button>
            </div>
            <div className="pt-4 border-t border-pink-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Weekly Goal Progress</span>
                <span className="text-sm text-muted-foreground">3/5 sessions</span>
              </div>
              <Progress value={60} className="h-2 bg-pink-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="border-pink-100">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 border-b">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Strengths</h4>
              <div className="space-y-1">
                <Badge variant="outline" className="bg-pink-50 text-primary">Problem Solving</Badge>
                <Badge variant="outline" className="bg-pink-50 text-primary">Communication</Badge>
                <Badge variant="outline" className="bg-pink-50 text-primary">Technical Knowledge</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Areas to Improve</h4>
              <div className="space-y-1">
                <Badge variant="outline" className="bg-pink-50/80 text-primary/80">System Design</Badge>
                <Badge variant="outline" className="bg-pink-50/80 text-primary/80">Negotiation</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Recommended Practice</h4>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">• Practice STAR method responses</p>
                <p className="text-sm text-gray-600">• Review system design patterns</p>
                <p className="text-sm text-gray-600">• Mock technical interviews</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
