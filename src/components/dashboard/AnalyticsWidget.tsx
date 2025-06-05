import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight, BarChart2, LineChart, PieChart, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface AnalyticsWidgetProps {
  compact?: boolean;
}

export const AnalyticsWidget = ({ compact = false }: AnalyticsWidgetProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const applicationTrend = [
    { month: "Aug", applications: 8, responses: 3, interviews: 1 },
    { month: "Sep", applications: 12, responses: 5, interviews: 2 },
    { month: "Oct", applications: 15, responses: 6, interviews: 3 },
    { month: "Nov", applications: 18, responses: 8, interviews: 4 },
    { month: "Dec", applications: 22, responses: 9, interviews: 5 },
    { month: "Jan", applications: 25, responses: 12, interviews: 6 }
  ];

  const keyMetrics = [
    {
      title: "Response Rate",
      value: "34%",
      change: "+8%",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4 text-green-600" />,
      color: "text-green-600"
    },
    {
      title: "Avg. Response Time",
      value: "5.2d",
      change: "-1.3d",
      trend: "down",
      icon: <LineChart className="h-4 w-4 text-blue-600" />,
      color: "text-blue-600"
    },
    {
      title: "Top Job Type",
      value: "Remote",
      change: "38%",
      trend: "up",
      icon: <PieChart className="h-4 w-4 text-purple-600" />,
      color: "text-purple-600"
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">
          <span className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-600" />
            Analytics Snapshot
          </span>
        </CardTitle>
        <Link to="/analytics" className="text-sm text-blue-600 flex items-center gap-1">
          <span>Full Analytics</span>
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[240px] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className={`${compact ? 'h-[150px]' : 'h-[180px]'} bg-slate-50 rounded-lg p-4 flex items-center justify-center relative overflow-hidden`}>
              {/* This is a simplified chart representation */}
              <div className="absolute inset-0 flex items-end px-4 pb-4">
                {applicationTrend.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div className="h-24 flex flex-col justify-end space-y-1 w-full px-1">
                      <div
                        className="bg-blue-500 rounded-t-sm w-full"
                        style={{ height: `${(data.applications / 25) * 100}%` }}
                      ></div>
                      <div
                        className="bg-green-500 rounded-t-sm w-full"
                        style={{ height: `${(data.responses / 25) * 100}%` }}
                      ></div>
                      <div
                        className="bg-yellow-500 rounded-t-sm w-full"
                        style={{ height: `${(data.interviews / 25) * 100}%` }}
                      ></div>
                    </div>
                    {!compact && <span className="text-xs text-gray-500">{data.month}</span>}
                  </div>
                ))}
              </div>

              {compact && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4">
                  <span className="text-xs text-gray-500">Aug</span>
                  <span className="text-xs text-gray-500">Jan</span>
                </div>
              )}

              {!compact && (
                <div className="absolute inset-0 flex items-center justify-center flex-col z-10 bg-white/60
