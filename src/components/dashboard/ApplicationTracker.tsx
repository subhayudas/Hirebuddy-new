
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const applications = [
  {
    company: "TechFlow Inc",
    position: "Frontend Developer",
    status: "Interview Scheduled",
    date: "Dec 15, 2024",
    statusColor: "bg-blue-100 text-blue-800"
  },
  {
    company: "DataCorp",
    position: "Full Stack Engineer",
    status: "Under Review",
    date: "Dec 12, 2024",
    statusColor: "bg-yellow-100 text-yellow-800"
  },
  {
    company: "StartupXYZ",
    position: "React Developer",
    status: "Applied",
    date: "Dec 10, 2024",
    statusColor: "bg-gray-100 text-gray-800"
  },
  {
    company: "WebSolutions",
    position: "JavaScript Developer",
    status: "Rejected",
    date: "Dec 8, 2024",
    statusColor: "bg-red-100 text-red-800"
  }
];

export const ApplicationTracker = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((app, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{app.position}</h4>
                <p className="text-sm text-gray-600">{app.company}</p>
              </div>
              <Badge className={app.statusColor}>
                {app.status}
              </Badge>
            </div>
            <p className="text-xs text-gray-500">{app.date}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
