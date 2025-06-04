
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Video } from "lucide-react";

export const UpcomingEvents = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Technical Interview",
      company: "TechFlow Inc",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      type: "interview",
      location: "Video Call",
      priority: "high"
    },
    {
      id: 2,
      title: "Resume Deadline",
      company: "StartupXYZ",
      date: "Tomorrow",
      time: "11:59 PM",
      type: "deadline",
      location: "Email Submission",
      priority: "high"
    },
    {
      id: 3,
      title: "Coffee Chat",
      company: "DataCorp",
      date: "Jan 25",
      time: "10:00 AM - 11:00 AM",
      type: "networking",
      location: "Local Cafe",
      priority: "medium"
    },
    {
      id: 4,
      title: "Follow-up Email",
      company: "InnovateLabs",
      date: "Jan 28",
      time: "9:00 AM",
      type: "followup",
      location: "Email",
      priority: "low"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "interview": return "bg-blue-100 text-blue-800";
      case "deadline": return "bg-red-100 text-red-800";
      case "networking": return "bg-green-100 text-green-800";
      case "followup": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-4 border-red-500";
      case "medium": return "border-l-4 border-yellow-500";
      case "low": return "border-l-4 border-green-500";
      default: return "border-l-4 border-gray-300";
    }
  };

  const getLocationIcon = (location: string) => {
    if (location.includes("Video") || location.includes("Call")) {
      return <Video className="h-3 w-3" />;
    }
    return <MapPin className="h-3 w-3" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className={`p-3 rounded-lg bg-gray-50 ${getPriorityColor(event.priority)}`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{event.title}</h4>
                <Badge className={getTypeColor(event.type)}>
                  {event.type}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600">{event.company}</p>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  {event.date}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {event.time}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  {getLocationIcon(event.location)}
                  {event.location}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="text-xs">
                  Edit
                </Button>
                {event.type === "interview" && (
                  <Button size="sm" className="text-xs">
                    Join
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full">
          View All Events
        </Button>
      </CardContent>
    </Card>
  );
};
