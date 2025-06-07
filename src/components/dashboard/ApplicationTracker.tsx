
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const applications = [
  {
    company: "TechFlow Inc",
    position: "Frontend Developer",
    status: "Interview Scheduled",
    date: "Dec 15, 2024",
    statusColor: "bg-pink-100 text-primary"
  },
  {
    company: "DataCorp",
    position: "Full Stack Engineer",
    status: "Under Review",
    date: "Dec 12, 2024",
    statusColor: "bg-pink-50 text-primary/80"
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
    statusColor: "bg-red-50 text-red-600"
  }
];

export const ApplicationTracker = () => {
  return (
    <Card className="border-pink-100">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 border-b">
        <CardTitle>Application Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {applications.map((app, index) => (
          <div key={index} className="border-l-4 border-primary pl-4 hover:bg-pink-50/50 p-2 rounded-r transition-colors">
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
