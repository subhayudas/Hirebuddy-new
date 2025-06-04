
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, MapPin, Briefcase } from "lucide-react";

export const MarketInsights = () => {
  const salaryTrends = [
    { month: "Aug", frontend: 110, backend: 120, fullstack: 115 },
    { month: "Sep", frontend: 112, backend: 122, fullstack: 117 },
    { month: "Oct", frontend: 115, backend: 125, fullstack: 120 },
    { month: "Nov", frontend: 118, backend: 128, fullstack: 123 },
    { month: "Dec", frontend: 120, backend: 130, fullstack: 125 },
    { month: "Jan", frontend: 125, backend: 135, fullstack: 130 }
  ];

  const topSkillsDemand = [
    { skill: "React", demand: 92, growth: "+15%" },
    { skill: "TypeScript", demand: 88, growth: "+22%" },
    { skill: "Node.js", demand: 85, growth: "+18%" },
    { skill: "Python", demand: 82, growth: "+20%" },
    { skill: "AWS", demand: 79, growth: "+25%" },
    { skill: "Docker", demand: 75, growth: "+30%" }
  ];

  const jobMarketData = [
    { location: "San Francisco", jobs: 2840, avgSalary: 145 },
    { location: "Remote", jobs: 3250, avgSalary: 120 },
    { location: "New York", jobs: 2100, avgSalary: 135 },
    { location: "Austin", jobs: 1650, avgSalary: 115 },
    { location: "Seattle", jobs: 1890, avgSalary: 140 }
  ];

  const industryDistribution = [
    { name: "Tech Startups", value: 35, color: "#3B82F6" },
    { name: "Enterprise", value: 28, color: "#10B981" },
    { name: "Financial", value: 15, color: "#F59E0B" },
    { name: "Healthcare", value: 12, color: "#8B5CF6" },
    { name: "E-commerce", value: 10, color: "#EF4444" }
  ];

  const marketInsights = [
    {
      title: "Hot Skill",
      value: "TypeScript",
      description: "22% growth in demand",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Avg Salary Increase",
      value: "+8.5%",
      description: "Year over year growth",
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      title: "Remote Jobs",
      value: "68%",
      description: "Of all job postings",
      icon: MapPin,
      color: "text-purple-600"
    },
    {
      title: "Time to Hire",
      value: "23 days",
      description: "Average hiring cycle",
      icon: Briefcase,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketInsights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{insight.title}</p>
                  <p className={`text-2xl font-bold ${insight.color}`}>{insight.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{insight.description}</p>
                </div>
                <insight.icon className={`h-8 w-8 ${insight.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Salary Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Trends by Role (in thousands)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salaryTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[100, 140]} />
                <Tooltip formatter={(value) => [`$${value}k`, '']} />
                <Line type="monotone" dataKey="frontend" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="backend" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="fullstack" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Frontend Developer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Backend Developer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Full Stack Developer</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Skills in Demand */}
        <Card>
          <CardHeader>
            <CardTitle>Most In-Demand Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSkillsDemand.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.skill}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-600">
                        {skill.growth}
                      </Badge>
                      <span className="text-sm text-gray-600">{skill.demand}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${skill.demand}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Industry Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Job Distribution by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {industryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {industryDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Market by Location */}
      <Card>
        <CardHeader>
          <CardTitle>Job Market by Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobMarketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="jobs" fill="#3B82F6" />
                <Bar yAxisId="right" dataKey="avgSalary" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Job Openings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Average Salary ($k)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Market Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-green-600">Opportunities</h4>
              <div className="space-y-2">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h5 className="font-medium">Learn TypeScript</h5>
                  <p className="text-sm text-gray-600">22% growth in demand, high salary potential</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h5 className="font-medium">Consider Remote Work</h5>
                  <p className="text-sm text-gray-600">68% of jobs offer remote options</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h5 className="font-medium">Target Startups</h5>
                  <p className="text-sm text-gray-600">35% of job market, faster hiring</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-blue-600">Market Trends</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium">Cloud Skills Rising</h5>
                  <p className="text-sm text-gray-600">AWS and Docker seeing 25%+ growth</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium">Full Stack in Demand</h5>
                  <p className="text-sm text-gray-600">Companies prefer versatile developers</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium">Salary Growth</h5>
                  <p className="text-sm text-gray-600">8.5% average increase year over year</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
