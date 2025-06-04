
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Award, BookOpen } from "lucide-react";

export const SkillOverview = () => {
  const skillCategories = [
    {
      category: "Frontend Development",
      skills: [
        { name: "React", level: 90, trend: "+5%" },
        { name: "TypeScript", level: 85, trend: "+8%" },
        { name: "CSS/Tailwind", level: 88, trend: "+3%" },
        { name: "JavaScript", level: 92, trend: "+2%" }
      ]
    },
    {
      category: "Backend Development", 
      skills: [
        { name: "Node.js", level: 75, trend: "+12%" },
        { name: "Python", level: 60, trend: "+15%" },
        { name: "SQL", level: 70, trend: "+7%" },
        { name: "REST APIs", level: 80, trend: "+10%" }
      ]
    },
    {
      category: "Tools & Platforms",
      skills: [
        { name: "Git", level: 85, trend: "+3%" },
        { name: "Docker", level: 45, trend: "+20%" },
        { name: "AWS", level: 55, trend: "+18%" },
        { name: "Testing", level: 65, trend: "+8%" }
      ]
    }
  ];

  const recentAchievements = [
    {
      title: "React Advanced Certification",
      date: "2 days ago",
      type: "Certification",
      icon: Award
    },
    {
      title: "Completed TypeScript Assessment",
      date: "1 week ago", 
      type: "Assessment",
      icon: Target
    },
    {
      title: "Node.js Learning Path - 75% Complete",
      date: "2 weeks ago",
      type: "Learning",
      icon: BookOpen
    }
  ];

  const getSkillLevel = (level: number) => {
    if (level >= 90) return { label: "Expert", color: "text-green-600" };
    if (level >= 75) return { label: "Advanced", color: "text-blue-600" };
    if (level >= 60) return { label: "Intermediate", color: "text-yellow-600" };
    return { label: "Beginner", color: "text-red-600" };
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Skills</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Level</p>
                <p className="text-2xl font-bold">74%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certifications</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hours Learned</p>
                <p className="text-2xl font-bold">127</p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Categories */}
        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const skillInfo = getSkillLevel(skill.level);
                  return (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={skillInfo.color}>
                            {skillInfo.label}
                          </Badge>
                          <span className="text-sm text-green-600">{skill.trend}</span>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                      <div className="text-right text-sm text-muted-foreground">
                        {skill.level}%
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Achievements */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <achievement.icon className="h-8 w-8 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                  <Badge variant="outline">{achievement.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">System Design</h4>
                  <p className="text-sm text-blue-700 mb-2">High demand skill for senior roles</p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Start Learning
                  </Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">GraphQL</h4>
                  <p className="text-sm text-green-700 mb-2">Complement your REST API skills</p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Explore Course
                  </Button>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900">Kubernetes</h4>
                  <p className="text-sm text-purple-700 mb-2">Build on your Docker knowledge</p>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Take Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
