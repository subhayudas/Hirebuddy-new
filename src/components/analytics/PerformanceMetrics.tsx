
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TrendingUp, Target, Award, Clock } from "lucide-react";

export const PerformanceMetrics = () => {
  const skillProgress = [
    { month: "Aug", technical: 65, communication: 70, problemSolving: 68 },
    { month: "Sep", technical: 70, communication: 72, problemSolving: 71 },
    { month: "Oct", technical: 75, communication: 75, problemSolving: 74 },
    { month: "Nov", technical: 80, communication: 78, problemSolving: 77 },
    { month: "Dec", technical: 85, communication: 80, problemSolving: 81 },
    { month: "Jan", technical: 88, communication: 83, problemSolving: 85 }
  ];

  const skillRadar = [
    { skill: "React", current: 90, target: 95 },
    { skill: "TypeScript", current: 85, target: 90 },
    { skill: "Node.js", current: 75, target: 85 },
    { skill: "System Design", current: 60, target: 80 },
    { skill: "Testing", current: 70, target: 85 },
    { skill: "DevOps", current: 55, target: 75 }
  ];

  const interviewMetrics = [
    {
      metric: "Interview Success Rate",
      value: 75,
      target: 80,
      trend: "+15%",
      color: "text-green-600"
    },
    {
      metric: "Technical Assessment Score",
      value: 85,
      target: 90,
      trend: "+8%",
      color: "text-blue-600"
    },
    {
      metric: "Communication Rating",
      value: 88,
      target: 90,
      trend: "+5%",
      color: "text-purple-600"
    },
    {
      metric: "Problem Solving Score",
      value: 82,
      target: 85,
      trend: "+12%",
      color: "text-orange-600"
    }
  ];

  const recentAssessments = [
    {
      assessment: "React Advanced Patterns",
      score: 88,
      date: "2 days ago",
      improvement: "+8%",
      category: "Frontend"
    },
    {
      assessment: "System Design Basics",
      score: 72,
      date: "1 week ago",
      improvement: "+15%",
      category: "Architecture"
    },
    {
      assessment: "JavaScript Algorithms",
      score: 85,
      date: "2 weeks ago",
      improvement: "+5%",
      category: "Programming"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {interviewMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.metric}</h3>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}%
                  </span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">{metric.trend}</span>
                  </div>
                </div>
                <Progress value={metric.value} className="h-2" />
                <div className="text-xs text-gray-500">
                  Target: {metric.target}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Progress Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Development Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={skillProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="technical" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="communication" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="problemSolving" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Technical Skills</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Communication</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Problem Solving</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skill Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Current vs Target Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="Target"
                    dataKey="target"
                    stroke="#10B981"
                    fill="transparent"
                    strokeDasharray="5 5"
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Current Level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 border-2 border-green-500 border-dashed"></div>
                <span className="text-sm">Target Level</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assessments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAssessments.map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(assessment.score)}`}>
                      {assessment.score}%
                    </div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                  <div>
                    <h4 className="font-medium">{assessment.assessment}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{assessment.category}</Badge>
                      <span className="text-sm text-gray-500">{assessment.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-sm text-green-600">{assessment.improvement}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">vs previous</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-gray-600">Skills Improved</div>
                <div className="text-xs text-green-600">+3 this month</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">47h</div>
                <div className="text-sm text-gray-600">Practice Time</div>
                <div className="text-xs text-blue-600">+8h this week</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">87%</div>
                <div className="text-sm text-gray-600">Avg Score</div>
                <div className="text-xs text-orange-600">+5% improvement</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
