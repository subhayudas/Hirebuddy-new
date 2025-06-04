
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";

export const ApplicationStats = () => {
  const stats = [
    {
      title: "Total Applications",
      value: 47,
      change: "+8 this week",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Pending",
      value: 23,
      change: "48% of total",
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Interviews",
      value: 12,
      change: "+3 this week",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Rejected",
      value: 8,
      change: "17% rejection rate",
      icon: AlertCircle,
      color: "text-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
            {index === 0 && (
              <div className="mt-3">
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">75% response rate</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
