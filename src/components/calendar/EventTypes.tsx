
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Users, Target, MessageSquare, Calendar, CheckCircle } from "lucide-react";

export const EventTypes = () => {
  const eventTypes = [
    {
      name: "Interview",
      icon: Video,
      color: "bg-blue-500",
      count: 3,
      description: "Scheduled interviews"
    },
    {
      name: "Networking",
      icon: Users,
      color: "bg-green-500",
      count: 2,
      description: "Coffee chats & events"
    },
    {
      name: "Deadlines",
      icon: Target,
      color: "bg-red-500",
      count: 4,
      description: "Application deadlines"
    },
    {
      name: "Follow-ups",
      icon: MessageSquare,
      color: "bg-yellow-500",
      count: 5,
      description: "Follow-up reminders"
    }
  ];

  const quickActions = [
    {
      title: "Schedule Interview",
      icon: Video,
      color: "text-blue-600"
    },
    {
      title: "Set Deadline",
      icon: Target,
      color: "text-red-600"
    },
    {
      title: "Plan Networking",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Add Reminder",
      icon: MessageSquare,
      color: "text-yellow-600"
    }
  ];

  const calendarStats = [
    { label: "This Week", value: 8 },
    { label: "This Month", value: 23 },
    { label: "Completed", value: 67 }
  ];

  return (
    <div className="space-y-6">
      {/* Event Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Event Types
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {eventTypes.map((type, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${type.color} text-white`}>
                  <type.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-sm">{type.name}</div>
                  <div className="text-xs text-gray-500">{type.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm">{type.count}</div>
                <div className="text-xs text-gray-500">upcoming</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <action.icon className={`h-4 w-4 mr-2 ${action.color}`} />
              {action.title}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Calendar Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {calendarStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">{stat.label}</span>
              <span className="text-lg font-bold text-blue-600">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
