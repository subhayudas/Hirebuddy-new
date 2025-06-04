
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Clock, Users, Target, Video, CheckCircle } from "lucide-react";

export const InterviewTips = () => {
  const tipCategories = [
    {
      title: "Before the Interview",
      icon: Clock,
      color: "text-blue-600",
      tips: [
        {
          title: "Research the Company",
          description: "Study their mission, values, recent news, and products",
          importance: "Critical"
        },
        {
          title: "Review the Job Description",
          description: "Align your experience with required skills",
          importance: "High"
        },
        {
          title: "Prepare Your Stories",
          description: "Use STAR method for behavioral questions",
          importance: "High"
        },
        {
          title: "Test Your Technology",
          description: "Check camera, microphone, and internet connection",
          importance: "Medium"
        }
      ]
    },
    {
      title: "During the Interview",
      icon: Video,
      color: "text-green-600",
      tips: [
        {
          title: "Maintain Eye Contact",
          description: "Look at the camera, not the screen",
          importance: "High"
        },
        {
          title: "Ask Thoughtful Questions",
          description: "Show genuine interest in the role and company",
          importance: "High"
        },
        {
          title: "Be Specific",
          description: "Use concrete examples and metrics when possible",
          importance: "Medium"
        },
        {
          title: "Stay Positive",
          description: "Frame challenges as learning opportunities",
          importance: "Medium"
        }
      ]
    },
    {
      title: "Technical Interviews",
      icon: Target,
      color: "text-purple-600",
      tips: [
        {
          title: "Think Out Loud",
          description: "Explain your thought process while coding",
          importance: "Critical"
        },
        {
          title: "Start with Pseudocode",
          description: "Outline your approach before coding",
          importance: "High"
        },
        {
          title: "Consider Edge Cases",
          description: "Think about error handling and edge scenarios",
          importance: "High"
        },
        {
          title: "Optimize Gradually",
          description: "Get a working solution first, then optimize",
          importance: "Medium"
        }
      ]
    }
  ];

  const starMethod = {
    title: "STAR Method for Behavioral Questions",
    steps: [
      {
        letter: "S",
        word: "Situation",
        description: "Set the context and background"
      },
      {
        letter: "T", 
        word: "Task",
        description: "Describe what needed to be accomplished"
      },
      {
        letter: "A",
        word: "Action",
        description: "Explain what you specifically did"
      },
      {
        letter: "R",
        word: "Result",
        description: "Share the outcomes and what you learned"
      }
    ]
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* STAR Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            {starMethod.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {starMethod.steps.map((step, index) => (
              <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">
                  {step.letter}
                </div>
                <h4 className="font-semibold text-blue-900 mb-1">{step.word}</h4>
                <p className="text-sm text-blue-700">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tipCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className={`h-5 w-5 ${category.color}`} />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.tips.map((tip, tipIndex) => (
                <div key={tipIndex} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{tip.title}</h4>
                    <Badge className={getImportanceColor(tip.importance)}>
                      {tip.importance}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Interview Day Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">30 Minutes Before</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Test technology setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Review your resume</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Prepare questions to ask</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">During Interview</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Take notes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Ask for clarification when needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Express enthusiasm</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
