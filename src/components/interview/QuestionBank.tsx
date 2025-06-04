
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Star, Play } from "lucide-react";
import { useState } from "react";

export const QuestionBank = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const questionCategories = {
    behavioral: [
      {
        question: "Tell me about a time when you had to overcome a significant challenge at work.",
        difficulty: "Medium",
        tags: ["Problem Solving", "Resilience"],
        isFavorite: true
      },
      {
        question: "Describe a situation where you had to work with a difficult team member.",
        difficulty: "Medium", 
        tags: ["Teamwork", "Communication"],
        isFavorite: false
      },
      {
        question: "Give me an example of when you had to learn something new quickly.",
        difficulty: "Easy",
        tags: ["Learning", "Adaptability"],
        isFavorite: true
      }
    ],
    technical: [
      {
        question: "Explain the difference between let, const, and var in JavaScript.",
        difficulty: "Easy",
        tags: ["JavaScript", "Variables"],
        isFavorite: false
      },
      {
        question: "How would you optimize a React component's performance?",
        difficulty: "Medium",
        tags: ["React", "Performance"],
        isFavorite: true
      },
      {
        question: "Design a data structure for a social media feed.",
        difficulty: "Hard",
        tags: ["Data Structures", "System Design"],
        isFavorite: false
      }
    ],
    company: [
      {
        question: "Why do you want to work at our company?",
        difficulty: "Easy",
        tags: ["Company Research", "Motivation"],
        isFavorite: false
      },
      {
        question: "What do you know about our recent product launches?",
        difficulty: "Medium",
        tags: ["Company Research", "Industry Knowledge"],
        isFavorite: false
      }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          Study Plan
        </Button>
      </div>

      <Tabs defaultValue="behavioral" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="company">Company-Specific</TabsTrigger>
        </TabsList>

        {Object.entries(questionCategories).map(([category, questions]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="space-y-4">
              {questions.map((q, index) => (
                <Card key={index} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getDifficultyColor(q.difficulty)}>
                            {q.difficulty}
                          </Badge>
                          {q.isFavorite && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <h3 className="font-medium mb-3">{q.question}</h3>
                        <div className="flex items-center gap-2">
                          {q.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Star className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Practice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
