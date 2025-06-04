
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Plus } from "lucide-react";

export const ApplicationKanban = () => {
  const columns = [
    { id: "applied", title: "Applied", count: 15 },
    { id: "under-review", title: "Under Review", count: 8 },
    { id: "interview", title: "Interview", count: 5 },
    { id: "offer", title: "Offer", count: 2 },
    { id: "rejected", title: "Rejected", count: 7 }
  ];

  const applications = {
    applied: [
      { id: 1, company: "TechStart", position: "Frontend Dev", logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=40&h=40&fit=crop&crop=center", date: "Jan 15" },
      { id: 2, company: "DevCorp", position: "React Developer", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=center", date: "Jan 14" }
    ],
    "under-review": [
      { id: 3, company: "StartupXYZ", position: "Full Stack Engineer", logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=40&h=40&fit=crop&crop=center", date: "Jan 12" }
    ],
    interview: [
      { id: 4, company: "TechFlow Inc", position: "Senior Frontend", logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=40&h=40&fit=crop&crop=center", date: "Jan 10" }
    ],
    offer: [
      { id: 5, company: "DataCorp", position: "React Developer", logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=40&h=40&fit=crop&crop=center", date: "Jan 8" }
    ],
    rejected: [
      { id: 6, company: "OldTech", position: "Frontend Dev", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=center", date: "Jan 5" }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {columns.map((column) => (
        <Card key={column.id} className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm">
              <span>{column.title}</span>
              <Badge variant="secondary">{column.count}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {applications[column.id as keyof typeof applications]?.map((app) => (
              <Card key={app.id} className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={app.logo} alt={app.company} />
                      <AvatarFallback className="text-xs">{app.company.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{app.company}</span>
                  </div>
                  <h4 className="text-sm font-medium">{app.position}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {app.date}
                  </div>
                </div>
              </Card>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-1" />
              Add Application
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
