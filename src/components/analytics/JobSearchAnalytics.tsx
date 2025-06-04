
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const JobSearchAnalytics = () => {
  const applicationTrend = [
    { month: "Aug", applications: 8, responses: 3, interviews: 1 },
    { month: "Sep", applications: 12, responses: 5, interviews: 2 },
    { month: "Oct", applications: 15, responses: 6, interviews: 3 },
    { month: "Nov", applications: 18, responses: 8, interviews: 4 },
    { month: "Dec", applications: 22, responses: 9, interviews: 5 },
    { month: "Jan", applications: 25, responses: 12, interviews: 6 }
  ];

  const topCompanies = [
    { company: "TechFlow Inc", applications: 3, responses: 2 },
    { company: "StartupXYZ", applications: 2, responses: 1 },
    { company: "DataCorp", applications: 2, responses: 2 },
    { company: "InnovateLabs", applications: 2, responses: 0 },
    { company: "CodeMasters", applications: 1, responses: 1 }
  ];

  const jobTypeDistribution = [
    { name: "Full-time", value: 32, color: "#3B82F6" },
    { name: "Contract", value: 8, color: "#10B981" },
    { name: "Part-time", value: 4, color: "#F59E0B" },
    { name: "Remote", value: 18, color: "#8B5CF6" }
  ];

  const locationData = [
    { location: "San Francisco", count: 15 },
    { location: "Remote", count: 18 },
    { location: "New York", count: 8 },
    { location: "Austin", count: 6 },
    { location: "Seattle", count: 4 }
  ];

  return (
    <div className="space-y-6">
      {/* Application Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Application Trend Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={applicationTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="responses" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="interviews" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Responses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Interviews</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Applications by Job Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobTypeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {jobTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {jobTypeDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Companies */}
        <Card>
          <CardHeader>
            <CardTitle>Top Applied Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCompanies} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="company" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#3B82F6" />
                  <Bar dataKey="responses" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Applications by Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">34%</div>
            <div className="text-sm text-gray-600">Average Response Rate</div>
            <div className="text-xs text-green-600 mt-1">+8% vs last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">5.2</div>
            <div className="text-sm text-gray-600">Days to First Response</div>
            <div className="text-xs text-blue-600 mt-1">-1.3 days improved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">Remote</div>
            <div className="text-sm text-gray-600">Most Applied Job Type</div>
            <div className="text-xs text-orange-600 mt-1">38% of applications</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
