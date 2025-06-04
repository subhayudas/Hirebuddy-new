
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Target, Calendar, Star } from "lucide-react";

export const AnalyticsOverview = () => {
  const keyMetrics = [
    {
      title: "Applications Sent",
      value: 47,
      change: "+23%",
      trend: "up",
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Response Rate",
      value: "34%",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Interview Rate",
      value: "26%",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Profile Views",
      value: 156,
      change: "-5%",
      trend: "down",
      icon: Star,
      color: "text-orange-600"
    }
  ];

  const weeklyGoals = [
    { name: "Applications", current: 7, target: 10, percentage: 70 },
    { name: "Networking", current: 3, target: 5, percentage: 60 },
    { name: "Skill Practice", current: 4, target: 5, percentage: 80 },
    { name: "Profile Updates", current: 2, target: 2, percentage: 100 }
  ];

  const recentActivity = [
    {
      action: "Applied to Senior Frontend Developer at TechFlow",
      time: "2 hours ago",
      type: "application",
      icon: "🎯"
    },
    {
      action: "Completed React Advanced assessment (Score: 88%)",
      time: "1 day ago",
      type: "skill",
      icon: "📊"
    },
    {
      action: "Profile viewed by DataCorp recruiter",
      time: "2 days ago",
      type: "profile",
      icon: "👀"
    },
    {
      action: "Interview scheduled with StartupXYZ",
      time: "3 days ago",
      type: "interview",
      icon: "📅"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Goals Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-gray-600">
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <Progress value={goal.percentage} className="h-2" />
                <div className="text-right text-xs text-gray-500">
                  {goal.percentage}% complete
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">8.7</div>
            <div className="text-sm text-gray-600">AI Match Score</div>
            <div className="text-xs text-green-600 mt-1">+0.3 this week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">127</div>
            <div className="text-sm text-gray-600">Hours Invested</div>
            <div className="text-xs text-blue-600 mt-1">+12 this week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">23</div>
            <div className="text-sm text-gray-600">Skills Improved</div>
            <div className="text-xs text-orange-600 mt-1">+2 this month</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
