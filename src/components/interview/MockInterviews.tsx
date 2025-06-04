
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, Video, Mic } from "lucide-react";

export const MockInterviews = () => {
  const interviewTypes = [
    {
      title: "Behavioral Interview",
      description: "Practice common behavioral questions using the STAR method",
      duration: "30-45 minutes",
      difficulty: "Beginner",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Technical Coding",
      description: "Solve coding problems with real-time feedback",
      duration: "45-60 minutes", 
      difficulty: "Intermediate",
      icon: Play,
      color: "bg-green-500"
    },
    {
      title: "System Design",
      description: "Design scalable systems and explain your thought process",
      duration: "60-90 minutes",
      difficulty: "Advanced",
      icon: Video,
      color: "bg-purple-500"
    },
    {
      title: "AI Mock Interview",
      description: "Full interview simulation with AI interviewer",
      duration: "60 minutes",
      difficulty: "All Levels",
      icon: Mic,
      color: "bg-orange-500"
    }
  ];

  const recentSessions = [
    {
      type: "Behavioral",
      date: "2 days ago",
      score: 85,
      feedback: "Great storytelling, work on conciseness"
    },
    {
      type: "Technical",
      date: "1 week ago", 
      score: 78,
      feedback: "Good problem solving, optimize time complexity"
    },
    {
      type: "System Design",
      date: "1 week ago",
      score: 72,
      feedback: "Solid foundation, consider scalability more"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interviewTypes.map((type, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${type.color} text-white`}>
                  <type.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getDifficultyColor(type.difficulty)}>
                      {type.difficulty}
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {type.duration}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{type.description}</p>
              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Start Interview
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Practice Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{session.type} Interview</h4>
                  <p className="text-sm text-gray-600">{session.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Score: {session.score}%</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{session.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
