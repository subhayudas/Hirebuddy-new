
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Users, Star, Play, CheckCircle } from "lucide-react";

export const LearningPaths = () => {
  const learningPaths = [
    {
      title: "Full Stack JavaScript Developer",
      description: "Master modern web development with JavaScript, React, and Node.js",
      duration: "12 weeks",
      difficulty: "Intermediate",
      rating: 4.8,
      students: 2847,
      progress: 65,
      modules: [
        { name: "JavaScript Fundamentals", completed: true },
        { name: "React Basics", completed: true },
        { name: "React Advanced", completed: true },
        { name: "Node.js & Express", completed: false },
        { name: "Database Integration", completed: false },
        { name: "Deployment & DevOps", completed: false }
      ],
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "Git"]
    },
    {
      title: "Frontend Specialist",
      description: "Become an expert in modern frontend technologies and best practices",
      duration: "8 weeks",
      difficulty: "Advanced",
      rating: 4.9,
      students: 1923,
      progress: 30,
      modules: [
        { name: "Advanced CSS & Animations", completed: true },
        { name: "React Performance", completed: true },
        { name: "State Management", completed: false },
        { name: "Testing Strategies", completed: false },
        { name: "Build Tools & Optimization", completed: false }
      ],
      skills: ["React", "TypeScript", "CSS", "Testing", "Webpack"]
    },
    {
      title: "Backend Engineer",
      description: "Build scalable server-side applications and APIs",
      duration: "10 weeks",
      difficulty: "Intermediate",
      rating: 4.7,
      students: 1654,
      progress: 0,
      modules: [
        { name: "Server Architecture", completed: false },
        { name: "Database Design", completed: false },
        { name: "API Development", completed: false },
        { name: "Authentication & Security", completed: false },
        { name: "Microservices", completed: false }
      ],
      skills: ["Node.js", "Python", "SQL", "Docker", "AWS"]
    }
  ];

  const recommendedCourses = [
    {
      title: "System Design Interview Prep",
      provider: "TechEducation",
      duration: "6 hours",
      rating: 4.9,
      price: "Free"
    },
    {
      title: "Advanced React Patterns",
      provider: "CodeMaster",
      duration: "8 hours",
      rating: 4.8,
      price: "$29"
    },
    {
      title: "GraphQL Fundamentals",
      provider: "DevAcademy",
      duration: "4 hours",
      rating: 4.7,
      price: "$19"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Paths */}
      <div className="space-y-6">
        {learningPaths.map((path, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                  <p className="text-gray-600 mb-3">{path.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {path.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {path.students.toLocaleString()} students
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {path.rating}
                    </div>
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <Button className="mb-2">
                    {path.progress > 0 ? "Continue" : "Start"} Learning
                  </Button>
                  {path.progress > 0 && (
                    <div className="text-sm text-gray-600">
                      {path.progress}% Complete
                    </div>
                  )}
                </div>
              </div>

              {path.progress > 0 && (
                <div className="mb-4">
                  <Progress value={path.progress} className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Learning Modules</h4>
                  <div className="space-y-2">
                    {path.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="flex items-center gap-2">
                        <CheckCircle 
                          className={`h-4 w-4 ${
                            module.completed ? "text-green-600" : "text-gray-300"
                          }`} 
                        />
                        <span className={`text-sm ${
                          module.completed ? "text-gray-900" : "text-gray-500"
                        }`}>
                          {module.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Skills You'll Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Recommended Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-gray-600">by {course.provider}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {course.rating}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-600">{course.price}</span>
                      <Button size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
