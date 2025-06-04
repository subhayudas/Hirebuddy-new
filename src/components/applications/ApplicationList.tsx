
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, MapPin, ExternalLink, MessageSquare, Edit } from "lucide-react";

interface ApplicationListProps {
  filters: {
    status: string;
    company: string;
    position: string;
    dateRange: string;
  };
}

export const ApplicationList = ({ filters }: ApplicationListProps) => {
  const applications = [
    {
      id: 1,
      company: "TechFlow Inc",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA",
      appliedDate: "2024-01-15",
      status: "interview",
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=60&h=60&fit=crop&crop=center",
      salary: "$120k - $150k",
      nextStep: "Technical Interview",
      stepDate: "2024-01-20"
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      location: "Remote",
      appliedDate: "2024-01-12",
      status: "under-review",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center",
      salary: "$100k - $130k",
      nextStep: "Waiting for response",
      stepDate: null
    },
    {
      id: 3,
      company: "DataCorp",
      position: "React Developer",
      location: "New York, NY",
      appliedDate: "2024-01-10",
      status: "offer",
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=60&h=60&fit=crop&crop=center",
      salary: "$110k - $140k",
      nextStep: "Review offer",
      stepDate: "2024-01-18"
    },
    {
      id: 4,
      company: "InnovateLabs",
      position: "Frontend Engineer",
      location: "Austin, TX",
      appliedDate: "2024-01-08",
      status: "rejected",
      logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=60&h=60&fit=crop&crop=center",
      salary: "$95k - $125k",
      nextStep: "Application closed",
      stepDate: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "under-review": return "bg-yellow-100 text-yellow-800";
      case "interview": return "bg-green-100 text-green-800";
      case "offer": return "bg-purple-100 text-purple-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <Card key={app.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={app.logo} alt={app.company} />
                  <AvatarFallback>{app.company.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{app.position}</h3>
                  <p className="text-gray-600">{app.company}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {app.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Applied {app.appliedDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <Badge className={getStatusColor(app.status)}>
                  {app.status.replace("-", " ").toUpperCase()}
                </Badge>
                <p className="text-sm font-medium">{app.salary}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Notes
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Job
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Next Step: {app.nextStep}</p>
                  {app.stepDate && (
                    <p className="text-xs text-gray-500">Due: {app.stepDate}</p>
                  )}
                </div>
                {app.status === "interview" && (
                  <Button size="sm">
                    Schedule Interview
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
