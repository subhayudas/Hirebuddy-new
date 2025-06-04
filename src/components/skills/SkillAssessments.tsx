
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, Star, Trophy, Code, Database, Globe } from "lucide-react";

export const SkillAssessments = () => {
  const assessmentCategories = [
    {
      title: "Frontend Development",
      icon: Globe,
      color: "bg-blue-500",
      assessments: [
        {
          name: "React Fundamentals",
          duration: "30 min",
          questions: 25,
          difficulty: "Intermediate",
          lastScore: 85,
          completed: true
        },
        {
          name: "JavaScript ES6+",
          duration: "45 min", 
          questions: 40,
          difficulty: "Advanced",
          lastScore: 78,
          completed: true
        },
        {
          name: "CSS & Responsive Design",
          duration: "25 min",
          questions: 20,
          difficulty: "Beginner",
          lastScore: null,
          completed: false
        }
      ]
    },
    {
      title: "Backend Development",
      icon: Database,
      color: "bg-green-500",
      assessments: [
        {
          name: "Node.js & Express",
          duration: "40 min",
          questions: 30,
          difficulty: "Intermediate",
          lastScore: 72,
          completed: true
        },
        {
          name: "Database Design",
          duration: "35 min",
          questions: 25,
          difficulty: "Advanced",
          lastScore: null,
          completed: false
        },
        {
          name: "API Development",
          duration: "30 min",
          questions: 22,
          difficulty: "Intermediate",
          lastScore: 88,
          completed: true
        }
      ]
    },
    {
      title: "Programming Concepts",
      icon: Code,
      color: "bg-purple-500",
      assessments: [
        {
          name: "Data Structures",
          duration: "50 min",
          questions: 35,
          difficulty: "Advanced",
          lastScore: 65,
          completed: true
        },
        {
          name: "Algorithms",
          duration: "60 min",
          questions: 40,
          difficulty: "Advanced",
          lastScore: null,
          completed: false
        },
        {
          name: "System Design Basics",
          duration: "45 min",
          questions: 20,
          difficulty: "Expert",
          lastScore: null,
          completed: false
        }
      ]
    }
  ];

  const recentResults = [
    {
      assessment: "React Fundamentals",
      score: 85,
      date: "2 days ago",
      improvement: "+8%"
    },
    {
      assessment: "API Development", 
      score: 88,
      date: "1 week ago",
      improvement: "+12%"
    },
    {
      assessment: "Node.js & Express",
      score: 72,
      date: "2 weeks ago",
      improvement: "+5%"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-orange-100 text-orange-800";
      case "Expert": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Assessment Categories */}
      <div className="space-y-6">
        {assessmentCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.color} text-white`}>
                  <category.icon className="h-5 w-5" />
                </div>
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.assessments.map((assessment, assessmentIndex) => (
                  <Card key={assessmentIndex} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{assessment.name}</h4>
                          {assessment.completed && (
                            <Trophy className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            {assessment.duration} • {assessment.questions} questions
                          </div>
                          <Badge className={getDifficultyColor(assessment.difficulty)}>
                            {assessment.difficulty}
                          </Badge>
                        </div>

                        {assessment.lastScore && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Last Score</span>
                              <span className={`font-medium ${getScoreColor(assessment.lastScore)}`}>
                                {assessment.lastScore}%
                              </span>
                            </div>
                            <Progress value={assessment.lastScore} className="h-2" />
                          </div>
                        )}

                        <Button 
                          className="w-full"
                          variant={assessment.completed ? "outline" : "default"}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {assessment.completed ? "Retake" : "Start"} Assessment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Recent Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{result.assessment}</h4>
                  <p className="text-sm text-gray-600">{result.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                      {result.score}%
                    </span>
                    <span className="text-sm text-green-600">{result.improvement}</span>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
